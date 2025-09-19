// Black-box tests covering:
// - JWKS shape
// - Valid and expired JWT issuance
// - Proper 405 on wrong HTTP methods
import request from "supertest";
import app from "../server.js";

describe("JWKS Server", () => {
  it("GET /.well-known/jwks.json should return valid JWKs", async () => {
    const res = await request(app).get("/.well-known/jwks.json");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.keys)).toBe(true);
    expect(res.body.keys[0]).toHaveProperty("kid");
  });

  it("POST /auth should return a valid JWT", async () => {
    const res = await request(app).post("/auth");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("kid");
  });

  it("POST /auth?expired=true should return an expired JWT", async () => {
    const res = await request(app).post("/auth?expired=true");
    expect(res.statusCode).toBe(200);
    expect(res.body.expired).toBe(true);
  });

  it("should return 405 on wrong HTTP method", async () => {
    const res = await request(app).get("/auth");
    expect(res.statusCode).toBe(405);
  });
});
