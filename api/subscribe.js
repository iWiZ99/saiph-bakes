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
    const { email } = req.body || {};
    if (!email || !email.includes("@")) {
      return res.status(400).json({ ok: false, error: "Valid email is required" });
    }

    const sql = getDb();
    await sql`
      INSERT INTO newsletter_subscribers (email, status)
      VALUES (${email.trim().toLowerCase()}, 'active')
      ON CONFLICT (email) DO NOTHING;
    `;

    return res.status(200).json({ ok: true, message: "Subscribed successfully" });
  } catch (err) {
    console.error("Newsletter error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
