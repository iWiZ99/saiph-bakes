import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";

// Load .env.local if present
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

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const sql = neon(dbUrl);

async function init() {
  console.log("Connecting to Postgres database on Neon...");

  // 1. Orders table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number VARCHAR(32) UNIQUE NOT NULL,
      customer_name VARCHAR(128) NOT NULL,
      customer_email VARCHAR(128) NOT NULL,
      customer_phone VARCHAR(32) NOT NULL,
      delivery_address TEXT,
      delivery_city VARCHAR(64) DEFAULT 'Mumbai',
      delivery_pincode VARCHAR(16),
      delivery_date DATE,
      delivery_slot VARCHAR(64),
      cake_message TEXT,
      items JSONB NOT NULL,
      subtotal NUMERIC(10, 2) NOT NULL,
      discount NUMERIC(10, 2) DEFAULT 0,
      shipping NUMERIC(10, 2) DEFAULT 0,
      total NUMERIC(10, 2) NOT NULL,
      payment_method VARCHAR(32) DEFAULT 'razorpay',
      payment_status VARCHAR(32) DEFAULT 'pending',
      order_status VARCHAR(32) DEFAULT 'placed',
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ orders table ready");

  // 2. Custom cake requests table
  await sql`
    CREATE TABLE IF NOT EXISTS custom_cakes (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(128) NOT NULL,
      customer_email VARCHAR(128) NOT NULL,
      customer_phone VARCHAR(32) NOT NULL,
      event_date DATE,
      flavour VARCHAR(64),
      tier_count VARCHAR(32),
      weight VARCHAR(32),
      message_on_cake TEXT,
      reference_image_url TEXT,
      instructions TEXT,
      status VARCHAR(32) DEFAULT 'new',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ custom_cakes table ready");

  // 3. Newsletter subscribers table
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(128) UNIQUE NOT NULL,
      status VARCHAR(32) DEFAULT 'active',
      subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ newsletter_subscribers table ready");

  // 4. Contact / Corporate inquiries table
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      phone VARCHAR(32),
      subject VARCHAR(128),
      type VARCHAR(32) DEFAULT 'general',
      message TEXT NOT NULL,
      status VARCHAR(32) DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ inquiries table ready");

  // 5. Product reviews table
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id VARCHAR(64) NOT NULL,
      author_name VARCHAR(128) NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      headline VARCHAR(256),
      body TEXT NOT NULL,
      verified BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ reviews table ready");

  // 6. Products catalog table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(64) PRIMARY KEY,
      slug VARCHAR(128) UNIQUE,
      title VARCHAR(256) NOT NULL,
      brand VARCHAR(64) NOT NULL,
      category VARCHAR(64) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      compare_at NUMERIC(10, 2),
      badges JSONB DEFAULT '[]',
      short_desc TEXT,
      long_desc TEXT,
      ingredients TEXT,
      allergens TEXT,
      image_url TEXT,
      in_stock BOOLEAN DEFAULT true,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ products table ready");

  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `;
  console.log("Current tables in database:", tables.map(t => t.table_name).join(", "));
}

init().catch(err => {
  console.error("Init DB failed:", err);
  process.exit(1);
});
