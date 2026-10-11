import { describe, expect, it } from "vitest";
import { mapsUrl } from "@/lib/mapsUrl";
import { LOCATIONS } from "@/data/mockLocations";

describe("mapsUrl", () => {
  it("starts with correct link", () => {
    for (const location of LOCATIONS) {
      expect(mapsUrl(location).startsWith("https://www.google.com/maps/search/")).toBe(true);
    }
  });

  it("is URL-encoded", () => {
    for (const location of LOCATIONS) {
      const { address, city, state, zip } = location;
      const expected = encodeURIComponent(`${address}, ${city}, ${state} ${zip}`);
      expect(mapsUrl(location), location._id).toBe("https://www.google.com/maps/search/?api=1&query=" + expected);
    }
  });
});
