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
      const orderNumber = b.orderNumber || b.order_number || `SB-${Date.now().toString().slice(-5)}`;
      const name = b.customerName || b.name || "Guest Customer";
      const email = b.customerEmail || b.email || "";
      const phone = b.customerPhone || b.phone || "";
      const address = b.deliveryAddress || b.address || "";
      const city = b.deliveryCity || b.city || "Mumbai";
      const pincode = b.deliveryPincode || b.pincode || "";
      const date = b.deliveryDate || b.date || null;
      const slot = b.deliverySlot || b.slot || "Standard 10:00 - 14:00";
      const cakeMessage = b.cakeMessage || b.message || "";
      const items = JSON.stringify(b.items || []);
      const subtotal = Number(b.subtotal || 0);
      const discount = Number(b.discount || 0);
      const shipping = Number(b.shipping || 0);
      const total = Number(b.total || (subtotal - discount + shipping));
      const paymentMethod = b.paymentMethod || "cod";
      const paymentStatus = b.paymentStatus || "pending";
      const notes = b.notes || "";

      const result = await sql`
        INSERT INTO orders (
          order_number, customer_name, customer_email, customer_phone,
          delivery_address, delivery_city, delivery_pincode, delivery_date,
          delivery_slot, cake_message, items, subtotal, discount,
          shipping, total, payment_method, payment_status, order_status, notes
        ) VALUES (
          ${orderNumber}, ${name}, ${email}, ${phone},
          ${address}, ${city}, ${pincode}, ${date},
          ${slot}, ${cakeMessage}, ${items}::jsonb, ${subtotal}, ${discount},
          ${shipping}, ${total}, ${paymentMethod}, ${paymentStatus}, 'placed', ${notes}
        )
        RETURNING id, order_number, total, order_status, created_at;
      `;

      return res.status(201).json({
        ok: true,
        order: result[0]
      });
    } catch (err) {
      console.error("Order insertion error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { order_number, email } = req.query;
      if (order_number) {
        const rows = await sql`
          SELECT * FROM orders WHERE order_number = ${order_number} LIMIT 1;
        `;
        if (!rows.length) {
          return res.status(404).json({ ok: false, error: "Order not found" });
        }
        return res.status(200).json({ ok: true, order: rows[0] });
      }

      if (email) {
        const rows = await sql`
          SELECT * FROM orders WHERE customer_email = ${email} ORDER BY created_at DESC LIMIT 20;
        `;
        return res.status(200).json({ ok: true, orders: rows });
      }

      // Default: recent orders limit 20
      const rows = await sql`
        SELECT id, order_number, customer_name, total, order_status, created_at 
        FROM orders 
        ORDER BY created_at DESC 
        LIMIT 20;
      `;
      return res.status(200).json({ ok: true, orders: rows });
    } catch (err) {
      console.error("Order query error:", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
