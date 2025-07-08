import fs from "fs";
import path from "path";
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function setupDatabase(): Promise<void> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

  try {
    console.log("🔌 Ansluter till databasen...");

    // Read the SQL file
    const sqlPath = path.join(__dirname, "..", "database-setup.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    console.log("📝 Kör SQL-script...");
    await pool.query(sqlContent);

    console.log("✅ Databas setup slutförd!");

    // Test the connection by fetching articles
    const result = await pool.query("SELECT COUNT(*) FROM articles");
    console.log(`📊 Antal artiklar i databasen: ${result.rows[0].count}`);

    // Check if users table exists and has any users
    const userResult = await pool.query("SELECT COUNT(*) FROM users");
    console.log(`👥 Antal användare i databasen: ${userResult.rows[0].count}`);
  } catch (error) {
    console.error(
      "❌ Fel vid setup av databas:",
      error instanceof Error ? error.message : error
    );
  } finally {
    await pool.end();
  }
}

setupDatabase();
