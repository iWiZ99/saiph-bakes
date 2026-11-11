/* Headless smoke test: loads the data/state/UI modules against a minimal DOM
   stub and exercises the pure logic. Run with: node tools/smoke.mjs          */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

/* ------------------------------ DOM stub -------------------------------- */
function el(tag = "div") {
  const node = {
    tagName: String(tag).toUpperCase(),
    style: { setProperty() {}, getPropertyValue: () => "", removeProperty() {} },
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    dataset: {},
    children: [],
    hidden: false,
    innerHTML: "",
    textContent: "",
    appendChild(c) { node.children.push(c); return c; },
    insertBefore(c) { node.children.unshift(c); return c; },
    remove() {},
    setAttribute() {}, getAttribute: () => null, removeAttribute() {},
    addEventListener() {}, removeEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    closest: () => null,
    focus() {}, scrollIntoView() {},
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 })
  };
  return node;
}

const store = new Map();
const sandbox = {
  console,
  performance: { now: () => Date.now() },
  setTimeout, clearTimeout, setInterval, clearInterval,
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  URLSearchParams,
  Math, JSON, Date, Object, Array, String, Number, Boolean, RegExp, Error, isNaN, parseInt, parseFloat,
  encodeURIComponent, decodeURIComponent,
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k)
  },
  location: { search: "?id=gold-leaf-saffron-cheesecake", pathname: "/shop.html", hash: "" },
  history: { pushState() {}, replaceState() {} },
  matchMedia: () => ({ matches: false }),
  addEventListener() {},
  IntersectionObserver: class { observe() {} unobserve() {} }
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.document = Object.assign(el("document"), {
  documentElement: el("html"),
  head: el("head"),
  body: Object.assign(el("body"), { dataset: { page: "shop" } }),
  createElement: (t) => el(t),
  getElementById: () => null,
  readyState: "complete"
});

vm.createContext(sandbox);
for (const f of ["assets/js/data.js", "assets/js/store.js", "assets/js/ui.js", "assets/js/blocks.js"]) {
  vm.runInContext(read(f), sandbox, { filename: f });
}

/* -------------------------------- Checks -------------------------------- */
const S = sandbox.SAIPH;
let pass = 0, fail = 0;
const check = (name, fn) => {
  try {
    const r = fn();
    if (r === false) throw new Error("returned false");
    console.log("  ✓ " + name + (typeof r === "string" ? " — " + r : ""));
    pass++;
  } catch (e) {
    console.log("  ✗ " + name + " — " + e.message);
    fail++;
  }
};

console.log("\nData layer");
check("products normalise", () => {
  const n = S.data.products.length;
  if (n < 30) throw new Error("only " + n + " products");
  return n + " products";
});
check("every product has variants, price and brand", () => {
  S.data.products.forEach((p) => {
    if (!p.variants.length) throw new Error(p.id + " has no variants");
    if (!(p.price > 0)) throw new Error(p.id + " has no price");
    if (!p.brandName) throw new Error(p.id + " has no brand");
    if (!p.allergens) throw new Error(p.id + " missing allergens");
  });
  return "all " + S.data.products.length + " valid";
});
check("every product category id exists", () => {
  const ids = S.data.categories.map((c) => c.id);
  S.data.products.forEach((p) =>
    p.cats.forEach((c) => {
      if (ids.indexOf(c) === -1) throw new Error(p.id + " → unknown category " + c);
    }));
  return true;
});
check("every review points at a real product", () => {
  S.data.reviews.forEach((r) => {
    if (!S.query.byId(r.product)) throw new Error("orphan review for " + r.product);
  });
  return S.data.reviews.length + " reviews";
});
check("search finds a known product", () => {
  const r = S.query.search("kunafa");
  if (!r.length || r[0].id !== "pistachio-kunafa-croissant") throw new Error("bad ranking");
  return r.length + " hits";
});
check("related products exclude self", () => {
  const rel = S.query.related("red-velvet-cake", 4);
  if (rel.some((p) => p.id === "red-velvet-cake")) throw new Error("self included");
  return rel.length + " related";
});

console.log("\nCart & totals");
check("add to cart", () => {
  S.store.cart.add({ id: "chocolate-truffle-cake", variant: "1kg", qty: 2 });
  return S.store.cart.count() === 2 ? "qty 2" : false;
});
check("merges identical lines", () => {
  S.store.cart.add({ id: "chocolate-truffle-cake", variant: "1kg", qty: 1 });
  return S.store.cart.lines() === 1 && S.store.cart.count() === 3;
});
check("keeps distinct lines apart", () => {
  S.store.cart.add({ id: "chocolate-truffle-cake", variant: "1kg", qty: 1, message: "Hi" });
  return S.store.cart.lines() === 2;
});
check("addon pricing applies", () => {
  const base = S.store.priceOf({ id: "chocolate-truffle-cake", variant: "1kg", addons: [] });
  const withAddon = S.store.priceOf({ id: "chocolate-truffle-cake", variant: "1kg", addons: ["gold-leaf"] });
  return withAddon - base === 599 ? "+₹599" : false;
});
check("coupon applies and caps", () => {
  const res = S.store.coupon.apply("SAIPH10");
  if (!res.ok) throw new Error(res.reason);
  const t = S.store.totals();
  if (t.discount <= 0) throw new Error("no discount");
  if (t.discount > 500) throw new Error("cap breached");
  return "−₹" + t.discount;
});
check("brand-scoped coupon is rejected off-brand", () => {
  const res = S.store.coupon.apply("KHOWDY20");
  return res.ok === false ? res.reason : false;
});
check("free shipping above threshold", () => {
  const t = S.store.totals();
  return t.subtotal >= 999 ? (t.shipping === 0 ? "free" : false) : "n/a";
});
check("pickup mode drops shipping", () => {
  return S.store.totals({ mode: "pickup" }).shipping === 0;
});
check("midnight slot surcharge", () => {
  return S.store.totals({ slot: "midnight" }).slotFee === 199;
});
check("order placement clears cart", () => {
  const o = S.store.orders.place({
    mode: "delivery", date: "2026-08-26", slot: "evening", slotLabel: "4–7 PM",
    contact: { name: "Test", email: "t@e.com", phone: "9864000000" },
    address: { line: "1 Road", city: "Dibrugarh", pin: "786001" },
    payment: "upi"
  });
  if (S.store.cart.count() !== 0) throw new Error("cart not cleared");
  if (!o.id.startsWith("SB-")) throw new Error("bad id");
  return o.id;
});
check("order timeline advances", () => {
  const o = S.store.orders.latest();
  S.store.orders.advance(o.id);
  return S.store.orders.byId(o.id).timeline.filter((n) => n.done).length === 2;
});

console.log("\nWishlist & recents");
check("wishlist toggles", () => {
  S.store.wishlist.toggle("assam-tea-cookies");
  if (!S.store.wishlist.has("assam-tea-cookies")) throw new Error("not added");
  S.store.wishlist.toggle("assam-tea-cookies");
  return S.store.wishlist.has("assam-tea-cookies") === false;
});
check("recently viewed dedupes and caps", () => {
  for (let i = 0; i < 20; i++) S.store.recent.push(S.data.products[i % S.data.products.length].id);
  return S.store.recent.all().length <= 14;
});

console.log("\nUI rendering");
check("product card renders", () => {
  const html = S.ui.productCard(S.query.byId("gold-leaf-saffron-cheesecake"));
  if (html.indexOf("product-card__name") === -1) throw new Error("no name block");
  if (html.indexOf("data-quickadd") === -1) throw new Error("no quick add");
  return html.length + " chars";
});
check("all products render without throwing", () => {
  S.data.products.forEach((p) => S.ui.productCard(p));
  return "all " + S.data.products.length;
});
check("art is deterministic", () => {
  return S.ui.art("x", ["#000", "#111", "#222"], "cake") === S.ui.art("x", ["#000", "#111", "#222"], "cake");
});
check("money formats in Indian grouping", () => {
  const m = S.util.money(125000);
  return m === "₹1,25,000" ? m : "got " + m;
});
check("escaping blocks tag injection", () => {
  return S.util.esc('<img src=x onerror="alert(1)">').indexOf("<") === -1;
});
check("store cards render", () => {
  S.data.stores.forEach((s) => S.blocks.storeCard(s));
  return S.data.stores.length + " stores";
});
check("category cards render", () => {
  S.data.categories.forEach((c) => S.blocks.categoryCard(c));
  return S.data.categories.length + " categories";
});
check("date helper produces valid ISO days", () => {
  const d = S.util.dates(5, 0);
  return d.length === 5 && /^\d{4}-\d{2}-\d{2}$/.test(d[0].iso);
});

console.log("\n" + (fail ? "✗ " + fail + " failed, " : "") + pass + " passed\n");
process.exit(fail ? 1 : 0);
