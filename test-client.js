import fetch from "node-fetch";

const BASE_URL = "http://localhost:8080";

async function run() {
  console.log("🧪 Running JWKS server test client...\n");

  // 1. GET /.well-known/jwks.json
  console.log("➡️  GET /.well-known/jwks.json");
  const jwksRes = await fetch(`${BASE_URL}/.well-known/jwks.json`);
  const jwksData = await jwksRes.json();
  console.log("Status:", jwksRes.status);
  console.log("Response:", jwksData, "\n");

  // 2. POST /auth
  console.log("➡️  POST /auth");
  const authRes = await fetch(`${BASE_URL}/auth`, { method: "POST" });
  const authData = await authRes.json();
  console.log("Status:", authRes.status);
  console.log("Response:", authData, "\n");

  // 3. POST /auth?expired=true
  console.log("➡️  POST /auth?expired=true");
  const expiredRes = await fetch(`${BASE_URL}/auth?expired=true`, { method: "POST" });
  const expiredData = await expiredRes.json();
  console.log("Status:", expiredRes.status);
  console.log("Response:", expiredData, "\n");
}

run().catch(err => console.error("Test client failed:", err));
