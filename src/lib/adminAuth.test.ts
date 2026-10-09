import { describe, expect, it } from "vitest";
import { adminToken, safeEqual } from "@/lib/adminAuth";

describe("safeEqual", () => {
  it("returns true for identical strings", () => {
    expect(safeEqual("secret", "secret")).toBe(true);
  });

  it("returns false for strings that differ", () => {
    expect(safeEqual("secret", "secreT")).toBe(false);
  });

  it("returns false for strings of different length", () => {
    expect(safeEqual("secret", "secret1")).toBe(false);
  });
});

describe("adminToken", () => {
  it("returns null when the password is empty or not set", async () => {
    expect(await adminToken(undefined)).toBeNull();
    expect(await adminToken("")).toBeNull();
  });

  it("gives the same token for the same password", async () => {
    expect(await adminToken("hunter2")).toBe(await adminToken("hunter2"));
  });

  it("gives different tokens for different passwords", async () => {
    expect(await adminToken("hunter2")).not.toBe(await adminToken("hunter3"));
  });

  it("never contains the password itself", async () => {
    const token = await adminToken("hunter2");
    expect(token).not.toContain("hunter2");
  });
});
