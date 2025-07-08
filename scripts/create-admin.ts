import { hash } from "bcryptjs";
import { Pool } from "pg";
import * as readline from "readline";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function createAdmin(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Funktion för att fråga användaren
  const question = (query: string): Promise<string> =>
    new Promise((resolve) => rl.question(query, resolve));

  // Skapa pool-anslutning (samma som test-connection)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("=== Skapa Admin-konto ===\n");

    // Fråga efter användardata
    const username = await question("Användarnamn: ");
    const name = await question("Namn: ");
    const password = await question("Lösenord: ");

    if (!username || !name || !password) {
      console.log("❌ Alla fält måste fyllas i!");
      rl.close();
      return;
    }

    // Hasha lösenordet
    console.log("\n🔐 Hashar lösenord...");
    const hashedPassword = await hash(password, 12);

    // Kontrollera om användaren redan finns
    console.log("🔍 Kontrollerar om användaren redan finns...");
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      console.log("❌ En användare med detta användarnamn finns redan!");
      rl.close();
      return;
    }

    // Lägg in användaren i databasen
    console.log("💾 Lägger in användare i databasen...");
    const result = await pool.query(
      "INSERT INTO users (username, name, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, name, role",
      [username, name, hashedPassword, "admin"]
    );

    const user = result.rows[0];

    console.log("\n✅ Admin-konto skapat framgångsrikt!");
    console.log("📋 Användardata:");
    console.log(`   ID: ${user.id}`);
    console.log(`   Användarnamn: ${user.username}`);
    console.log(`   Namn: ${user.name}`);
    console.log(`   Roll: ${user.role}`);
    console.log("\n🔑 Du kan nu logga in på /admin med dessa uppgifter!");
  } catch (error) {
    console.error("❌ Ett fel uppstod:");
    console.error("Feltyp:", error?.constructor?.name || "Okänd");
    console.error(
      "Felmeddelande:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "Stack trace:",
      error instanceof Error ? error.stack : "Ingen stack trace"
    );

    // Visa mer detaljer om det är ett databasfel
    if (error && typeof error === "object" && "code" in error) {
      console.error("Databasfelkod:", (error as any).code);
    }
  } finally {
    await pool.end();
    rl.close();
  }
}

// Kör scriptet
createAdmin();
