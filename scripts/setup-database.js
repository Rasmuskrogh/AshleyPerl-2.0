const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

  try {
    console.log("Connecting to database...");

    // Read the SQL file
    const sqlPath = path.join(__dirname, "..", "database-setup.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    console.log("Executing SQL script...");
    await pool.query(sqlContent);

    console.log("Database setup completed successfully!");

    // Test the connection by fetching articles
    const result = await pool.query("SELECT COUNT(*) FROM articles");
    console.log(`Number of articles in database: ${result.rows[0].count}`);
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await pool.end();
  }
}

setupDatabase();
