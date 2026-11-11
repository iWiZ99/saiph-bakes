/* Static audit of the built pages: heading structure, alt text, schema,
   internal links and tag balance. Run with: node tools/audit.mjs            */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = readdirSync(ROOT).filter((f) => f.endsWith(".html"));
files.push("admin/index.html");

let problems = 0;
const note = (file, msg) => { console.log("  ! " + file + " — " + msg); problems++; };

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr", "path", "circle", "rect",
  "line", "polyline", "polygon", "stop", "use", "feturbulence", "fecolormatrix", "ellipse"]);

console.log("\nAuditing " + files.length + " pages\n");

const linkTargets = new Set();

for (const file of files) {
  const html = readFileSync(join(ROOT, file), "utf8");
  const base = file.includes("/") ? dirname(file) : "";

  /* --- one H1 --- */
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (file !== "admin/index.html" && h1s.length !== 1) {
    note(file, h1s.length + " <h1> elements (expected exactly 1)");
  }

  /* --- title & description --- */
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!title) note(file, "missing <title>");
  else if (title.length > 70) note(file, "title is " + title.length + " chars (>70)");
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  if (!desc) note(file, "missing meta description");
  else if (desc.length > 320) note(file, "meta description is " + desc.length + " chars");

  /* --- canonical --- */
  if (!/rel="canonical"/.test(html)) note(file, "missing canonical");

  /* --- images have alt --- */
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  imgs.forEach((tag) => {
    if (!/\balt=/.test(tag)) note(file, "img without alt: " + tag.slice(0, 60));
  });

  /* --- JSON-LD parses --- */
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  if (!blocks.length) note(file, "no JSON-LD");
  blocks.forEach((blk, i) => {
    const json = blk.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    try { JSON.parse(json); } catch (e) { note(file, "JSON-LD block " + (i + 1) + " invalid: " + e.message); }
  });

  /* --- tag balance (non-void, non-svg-internal) --- */
  const counts = {};
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g;
  let m;
  while ((m = tagRe.exec(html))) {
    const [, closing, rawName, selfClose] = m;
    const name = rawName.toLowerCase();
    if (VOID.has(name) || selfClose === "/") continue;
    counts[name] = (counts[name] || 0) + (closing ? -1 : 1);
  }
  Object.keys(counts).forEach((tag) => {
    if (counts[tag] !== 0 && ["div", "section", "article", "aside", "span", "p", "ul", "li", "form", "nav", "main", "body", "html", "table", "tbody", "tr", "td", "th"].includes(tag)) {
      note(file, "unbalanced <" + tag + "> (" + (counts[tag] > 0 ? "+" : "") + counts[tag] + ")");
    }
  });

  /* --- collect internal links --- */
  const hrefs = html.match(/href="([^"#?:]+\.html)[^"]*"/g) || [];
  hrefs.forEach((h) => {
    const target = h.match(/href="([^"#?:]+\.html)/)[1];
    linkTargets.add(base ? join(base, target).replace(/\\/g, "/") : target);
  });

  /* --- scripts present --- */
  if (!/assets\/js\/app\.js/.test(html) && !/assets\/js\/app\.js/.test(html.replace("../", ""))) {
    note(file, "app.js not linked");
  }
}

console.log("\nInternal link targets");
[...linkTargets].sort().forEach((t) => {
  const clean = t.replace(/^\.\.\//, "");
  if (!existsSync(join(ROOT, clean))) note("links", "broken target: " + t);
});

console.log("\nAssets");
["assets/css/tokens.css", "assets/css/base.css", "assets/css/components.css", "assets/css/pages.css",
  "assets/js/data.js", "assets/js/store.js", "assets/js/ui.js", "assets/js/blocks.js", "assets/js/app.js",
  "assets/img/logo.svg", "assets/img/favicon.svg", "assets/img/og-cover.svg",
  "sitemap.xml", "robots.txt", "manifest.webmanifest"].forEach((a) => {
  if (!existsSync(join(ROOT, a))) note("assets", "missing " + a);
});

/* every page-*.js referenced by a page exists */
for (const file of files) {
  const html = readFileSync(join(ROOT, file), "utf8");
  (html.match(/src="[^"]*\/(page-[a-z0-9-]+\.js)"/g) || []).forEach((s) => {
    const name = s.match(/(page-[a-z0-9-]+\.js)/)[1];
    if (!existsSync(join(ROOT, "assets/js", name))) note(file, "missing script " + name);
  });
}

console.log("\n" + (problems ? "✗ " + problems + " issue(s) found" : "✓ no issues found") + "\n");
process.exit(problems ? 1 : 0);
