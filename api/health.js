import { getDb } from "./_db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  try {
    const sql = getDb();
    const [now] = await sql`SELECT NOW() as db_time, version() as pg_version;`;
    const [productCount] = await sql`SELECT count(*)::int as count FROM products;`;
    const [orderCount] = await sql`SELECT count(*)::int as count FROM orders;`;
    const [customCakeCount] = await sql`SELECT count(*)::int as count FROM custom_cakes;`;
    const [subscriberCount] = await sql`SELECT count(*)::int as count FROM newsletter_subscribers;`;
    const [inquiryCount] = await sql`SELECT count(*)::int as count FROM inquiries;`;
    const [reviewCount] = await sql`SELECT count(*)::int as count FROM reviews;`;

    return res.status(200).json({
      status: "healthy",
      database: "Postgres (Neon Serverless)",
      serverTime: new Date().toISOString(),
      databaseTime: now.db_time,
      postgresVersion: now.pg_version.split(" ")[0] + " " + now.pg_version.split(" ")[1],
      tables: {
        products: productCount.count,
        orders: orderCount.count,
        custom_cakes: customCakeCount.count,
        newsletter_subscribers: subscriberCount.count,
        inquiries: inquiryCount.count,
        reviews: reviewCount.count
      }
    });
  } catch (err) {
    console.error("Health check error:", err);
    return res.status(500).json({
      status: "unhealthy",
      error: err.message
    });
  }
}
