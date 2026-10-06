// Shared by the middleware (Edge runtime) and the login route, so it only uses Web APIs (no Node imports).
// This is demo-grade protection: one shared password, no accounts, no lockout.

export const ADMIN_COOKIE = "admin_session";

/**
 * Turns the admin password into the value stored in the login cookie (an HMAC signature of a fixed message),
 * so the cookie never contains the password itself. Returns null when the password is empty or not set
 */
export async function adminToken(password: string | undefined): Promise<string | null> {
  if (!password) return null;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("h4i-admin-session"));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Compares two strings without stopping at the first difference,
 * so the time it takes does not reveal how much of a guess was right
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return difference === 0;
}
