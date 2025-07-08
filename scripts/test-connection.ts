import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function testConnection(): Promise<void> {
  console.log("🔍 Testar databasanslutning...");
  console.log(
    "DATABASE_URL:",
    process.env.DATABASE_URL ? "✅ Satt" : "❌ Inte satt"
  );

  if (process.env.DATABASE_URL) {
    console.log(
      "URL börjar med:",
      process.env.DATABASE_URL.substring(0, 20) + "..."
    );
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL är inte satt i .env.local");
    return;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("🔌 Försöker ansluta...");
    const client = await pool.connect();
    console.log("✅ Anslutning lyckades!");

    const result = await client.query("SELECT NOW()");
    console.log("🕐 Aktuell databastid:", result.rows[0].now);

    // Test additional queries
    const articlesResult = await client.query("SELECT COUNT(*) FROM articles");
    console.log("📊 Antal artiklar:", articlesResult.rows[0].count);

    const usersResult = await client.query("SELECT COUNT(*) FROM users");
    console.log("👥 Antal användare:", usersResult.rows[0].count);

    client.release();
  } catch (error) {
    console.error(
      "❌ Anslutningsfel:",
      error instanceof Error ? error.message : error
    );
    if (error instanceof Error && "code" in error) {
      console.error("Felkod:", (error as any).code);
    }
  } finally {
    await pool.end();
  }
}

testConnection();
