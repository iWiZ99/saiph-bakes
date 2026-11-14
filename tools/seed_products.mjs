import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

// Load .env.local
if (existsSync(".env.local")) {
  const envContent = readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

const sql = neon(process.env.DATABASE_URL);

// Load data.js via vm
const sandbox = { console, Math, JSON, Date, Object, Array, String, Number, Boolean, RegExp, Error };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(readFileSync("assets/js/data.js", "utf8"), sandbox);

const products = sandbox.SAIPH?.data?.products || [];
const reviews = sandbox.SAIPH?.data?.reviews || [];

console.log(`Found ${products.length} products to sync into Postgres...`);

async function seed() {
  let count = 0;
  for (const p of products) {
    const id = p.id;
    const slug = p.slug || p.id;
    const title = p.name || p.title;
    const brand = p.brand || "saiph";
    const category = p.category || "cakes";
    const price = typeof p.price === "number" ? p.price : (p.variants?.[0]?.price || 0);
    const compare_at = p.compareAt || null;
    const badges = JSON.stringify(p.badges || (p.badge ? [p.badge] : []));
    const short_desc = p.desc || "";
    const long_desc = p.long || "";
    const ingredients = p.ingredients || "";
    const allergens = p.allergens || "";
    const image_url = p.image || "";

    await sql`
      INSERT INTO products (id, slug, title, brand, category, price, compare_at, badges, short_desc, long_desc, ingredients, allergens, image_url, in_stock, updated_at)
      VALUES (${id}, ${slug}, ${title}, ${brand}, ${category}, ${price}, ${compare_at}, ${badges}::jsonb, ${short_desc}, ${long_desc}, ${ingredients}, ${allergens}, ${image_url}, true, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        brand = EXCLUDED.brand,
        category = EXCLUDED.category,
        price = EXCLUDED.price,
        compare_at = EXCLUDED.compare_at,
        badges = EXCLUDED.badges,
        short_desc = EXCLUDED.short_desc,
        long_desc = EXCLUDED.long_desc,
        ingredients = EXCLUDED.ingredients,
        allergens = EXCLUDED.allergens,
        image_url = EXCLUDED.image_url,
        updated_at = CURRENT_TIMESTAMP;
    `;
    count++;
  }
  console.log(`✓ Synced ${count} products into Postgres database!`);

  if (reviews && reviews.length) {
    console.log(`Syncing ${reviews.length} reviews...`);
    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (product_id, author_name, rating, headline, body, verified, created_at)
        VALUES (${r.productId || r.product_id || 'signature-cake'}, ${r.author || r.name}, ${r.rating || 5}, ${r.headline || 'Excellent'}, ${r.body || r.comment || ''}, true, CURRENT_TIMESTAMP);
      `;
    }
    console.log(`✓ Synced ${reviews.length} reviews into Postgres database!`);
  }
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
