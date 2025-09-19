/**
 * Key management:
 * - Generates one valid RSA key and one already-expired RSA key.
 * - Exposes helpers to get active keys for JWKS and to pick a key
 *   (valid vs expired) when signing JWTs.
 */

 // makeRsaKey: generate an RSA keypair, attach kid + exp, store internal record.

 // initKeys: idempotently ensure both a valid and an expired key exist.

 // getActiveJwks: return only NON-expired public keys in JWKS format.

 // pickKey({ expired }): choose a key by expiry state (used by /auth route).

 // allKeys: shallow copy for any debugging/tests.

 // This is the test line to see in the git
 import { generateKeyPair, exportJWK } from "jose";
import { v4 as uuidv4 } from "uuid";
import { isExpired, minutesFromNow, nowSeconds } from "./util.js";

const KEY_TTL_MINUTES = 30;      // valid key lifetime
const EXPIRED_AGE_MINUTES = -30; // create an already-expired key
const keys = [];

async function makeRsaKey({ expiresInMinutes }) {
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const kid = uuidv4();
  const exp = expiresInMinutes >= 0
    ? minutesFromNow(expiresInMinutes)
    : nowSeconds() + expiresInMinutes * 60;

  const publicJwk = await exportJWK(publicKey);
  publicJwk.kid = kid;
  publicJwk.use = "sig";
  publicJwk.alg = "RS256";
  publicJwk.kty = "RSA";

  const record = { kid, privateKey, publicJwk, exp };
  keys.push(record);
  return record;
}

export async function initKeys() {
  if (keys.length) return keys;
  await makeRsaKey({ expiresInMinutes: KEY_TTL_MINUTES });      // valid key
  await makeRsaKey({ expiresInMinutes: EXPIRED_AGE_MINUTES });  // expired key
  return keys;
}

export function getActiveJwks() {
  return { keys: keys.filter(k => !isExpired(k.exp)).map(k => ({ ...k.publicJwk, exp: k.exp })) };
}

export function pickKey({ expired = false } = {}) {
  return keys.find(k => expired ? isExpired(k.exp) : !isExpired(k.exp));
}

export function allKeys() {
  return keys.slice();
}
