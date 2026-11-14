import { getDb } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const sql = getDb();

  if (req.method === "POST") {
    try {
      const b = req.body || {};
      const name = b.name || b.customer_name || "Custom Cake Inquiry";
      const email = b.email || b.customer_email || "";
      const phone = b.phone || b.customer_phone || "";
      const eventDate = b.date || b.event_date || null;
      const flavour = b.flavour || b.flavor || "";
      const tierCount = b.tiers || b.tier_count || "1 Tier";
      const weight = b.weight || "1 kg";
      const message = b.message || b.message_on_cake || "";
      const imageUrl = b.imageUrl || b.reference_image_url || "";
      const instructions = b.instructions || b.notes || "";

      const result = await sql`
        INSERT INTO custom_cakes (
          customer_name, customer_email, customer_phone, event_date,
          flavour, tier_count, weight, message_on_cake, reference_image_url,
          instructions, status
        ) VALUES (
          ${name}, ${email}, ${phone}, ${eventDate},
          ${flavour}, ${tierCount}, ${weight}, ${message}, ${imageUrl},
          ${instructions}, 'new'
        )
        RETURNING id, customer_name, event_date, status, created_at;
      `;

      return res.status(201).json({ ok: true, customCake: result[0] });
    } catch (err) {
      console.error("Custom cake submission error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const rows = await sql`
        SELECT * FROM custom_cakes ORDER BY created_at DESC LIMIT 20;
      `;
      return res.status(200).json({ ok: true, customCakes: rows });
    } catch (err) {
      console.error("Custom cakes fetch error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
