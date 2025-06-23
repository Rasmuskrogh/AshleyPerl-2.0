const fs = require("fs");
const path = require("path");

console.log("Current directory:", process.cwd());
console.log("Looking for .env.local file...");

const envPath = path.join(process.cwd(), ".env.local");

if (fs.existsSync(envPath)) {
  console.log(".env.local file found!");
  const content = fs.readFileSync(envPath, "utf8");
  console.log("Content:", content);
} else {
  console.log(".env.local file NOT found");
  console.log("Expected path:", envPath);

  // List all files in current directory
  const files = fs.readdirSync(".");
  console.log("Files in current directory:", files);
}
