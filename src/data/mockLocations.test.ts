import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { LOCATIONS } from "@/data/mockLocations";

describe("LOCATIONS", () => {
  it("contains a unique id", () => {
    const ids = LOCATIONS.map((location) => location._id);
    const unique_ids = new Set(ids);
    expect(unique_ids.size).toBe(ids.length);
  });

  it("contains non-empty fields", () => {
    for (const location of LOCATIONS) {
      for (const [key, value] of Object.entries(location)) {
        expect(typeof value === "string" && value.length > 0, `${location._id}.${key} is empty`).toBe(true);
      }
    }
  });

  it("has images that exist in the public folder", () => {
    for (const location of LOCATIONS) {
      const filePath = path.join(process.cwd(), "public", location.image);
      expect(existsSync(filePath)).toBe(true);
    }
  });

  it("has a 5 digit zip code", () => {
    for (const location of LOCATIONS) {
      expect(location.zip.length).toBe(5);
    }
  });
});
