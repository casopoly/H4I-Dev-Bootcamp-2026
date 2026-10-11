import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { DUMMY_MENU } from "@/data/mockMenuItems";
import { validateMenuItem } from "@/lib/validateMenuItem";

describe("DUMMY_MENU", () => {
  it("passes validateMenuItem for every item", () => {
    for (const item of DUMMY_MENU) {
      expect(validateMenuItem({ ...item })).toEqual({});
    }
  });

  it("has unique ids", () => {
    const ids = DUMMY_MENU.map((item) => item._id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("points every image at a file that exists in public/", () => {
    for (const item of DUMMY_MENU) {
      expect(fs.existsSync(path.join(process.cwd(), "public", item.image))).toBe(true);
    }
  });
});
