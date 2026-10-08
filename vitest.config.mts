import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Same "@/..." shortcut as tsconfig.json, so tests can import code the way the app does
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    setupFiles: ["./vitest.setup.mts"],
    include: ["src/**/*.test.ts"],
  },
});
