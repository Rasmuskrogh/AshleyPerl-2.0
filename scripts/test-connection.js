const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Manually load .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split("\n");
  lines.forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").replace(/^["']|["']$/g, "");
      process.env[key.trim()] = value.trim();
    }
  });
}

async function testConnection() {
  console.log("Testing database connection...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");

  if (process.env.DATABASE_URL) {
    console.log(
      "URL starts with:",
      process.env.DATABASE_URL.substring(0, 20) + "..."
    );
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set in .env.local");
    return;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("Attempting to connect...");
    const client = await pool.connect();
    console.log("Connected successfully!");

    const result = await client.query("SELECT NOW()");
    console.log("Current database time:", result.rows[0].now);

    client.release();
  } catch (error) {
    console.error("Connection error:", error.message);
    console.error("Error code:", error.code);
  } finally {
    await pool.end();
  }
}

testConnection();
