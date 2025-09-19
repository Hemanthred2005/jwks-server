// GET /.well-known/jwks.json
// Returns active (non-expired) RSA public keys in JWKS format for JWT verification.


// POST /auth[?expired=true]
// Issues an RS256 JWT signed by a key whose kid is set.
// - If expired=true, uses an expired key and sets JWT exp in the past.
// - Else, uses a valid key and sets a near-future exp.
import express from "express";
import { SignJWT } from "jose";
import { getActiveJwks, pickKey } from "./keys.js";
import { minutesFromNow, nowSeconds } from "./util.js";

const router = express.Router();

// JWKS endpoint
router.get("/.well-known/jwks.json", (_req, res) => {
  res.status(200).json(getActiveJwks());
});

// POST /auth[?expired=true]
router.post("/auth", async (req, res) => {
  const wantExpired = String(req.query.expired || "").toLowerCase() === "true";
  const keyRec = pickKey({ expired: wantExpired });
  if (!keyRec) return res.status(404).json({ error: "Suitable key not found" });

  const payloadExp = wantExpired ? nowSeconds() - 60 : minutesFromNow(5);
  const jwt = await new SignJWT({ sub: "student1", scope: "demo" })
    .setProtectedHeader({ alg: "RS256", kid: keyRec.kid })
    .setIssuedAt()
    .setExpirationTime(payloadExp)
    .setIssuer("jwks-demo")
    .setAudience("jwks-test-client")
    .sign(keyRec.privateKey);

  res.status(200).json({ token: jwt, kid: keyRec.kid, expired: wantExpired });
});

// health
router.get("/health", (_req, res) => res.status(200).send("ok"));

export default router;
