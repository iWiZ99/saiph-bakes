import { getDb } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const b = req.body || {};
    const name = b.name || "Customer";
    const email = b.email || "";
    const phone = b.phone || "";
    const subject = b.subject || "General Inquiry";
    const type = b.type || "contact";
    const message = b.message || "";

    if (!email || !message) {
      return res.status(400).json({ ok: false, error: "Email and message are required" });
    }

    const sql = getDb();
    const result = await sql`
      INSERT INTO inquiries (name, email, phone, subject, type, message)
      VALUES (${name}, ${email}, ${phone}, ${subject}, ${type}, ${message})
      RETURNING id, created_at;
    `;

    return res.status(201).json({ ok: true, inquiry: result[0] });
  } catch (err) {
    console.error("Inquiry error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
