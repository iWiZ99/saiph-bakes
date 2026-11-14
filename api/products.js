import { getDb } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const sql = getDb();

  try {
    const { id, category, brand, search, limit = 50 } = req.query;

    if (id) {
      const rows = await sql`SELECT * FROM products WHERE id = ${id} OR slug = ${id} LIMIT 1;`;
      if (!rows.length) {
        return res.status(404).json({ ok: false, error: "Product not found" });
      }
      return res.status(200).json({ ok: true, product: rows[0] });
    }

    if (category) {
      const rows = await sql`
        SELECT * FROM products WHERE category = ${category} LIMIT ${Number(limit)};
      `;
      return res.status(200).json({ ok: true, products: rows });
    }

    if (brand) {
      const rows = await sql`
        SELECT * FROM products WHERE brand = ${brand} LIMIT ${Number(limit)};
      `;
      return res.status(200).json({ ok: true, products: rows });
    }

    if (search) {
      const query = `%${search}%`;
      const rows = await sql`
        SELECT * FROM products 
        WHERE title ILIKE ${query} OR short_desc ILIKE ${query} OR ingredients ILIKE ${query}
        LIMIT ${Number(limit)};
      `;
      return res.status(200).json({ ok: true, products: rows });
    }

    const rows = await sql`
      SELECT id, slug, title, brand, category, price, compare_at, badges, short_desc, image_url, in_stock 
      FROM products 
      ORDER BY title ASC 
      LIMIT ${Number(limit)};
    `;
    return res.status(200).json({ ok: true, count: rows.length, products: rows });
  } catch (err) {
    console.error("Products query error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
