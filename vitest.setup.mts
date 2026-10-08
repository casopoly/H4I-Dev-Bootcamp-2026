import { webcrypto } from "node:crypto";

// Node 18 has no global `crypto` (Node 20+ and the Next.js runtime do), and src/lib/adminAuth.ts uses it
if (!globalThis.crypto) {
  Object.defineProperty(globalThis, "crypto", { value: webcrypto });
}
