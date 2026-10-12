import { describe, expect, it } from "vitest";
import { validateMenuItem } from "@/lib/validateMenuItem";

const check = (sizes: unknown) => validateMenuItem({ sizes }, { partial: true }).sizes;

describe("validateMenuItem sizes", () => {
  it("requires a price greater than 0", () => {
    expect(check([{ size: "S", price: 0 }])).toBeDefined();
    expect(check([{ size: "S", price: 0.01 }])).toBeUndefined();
  });

  it("rejects a duplicate size", () => {
    const message = check([
      { size: "S", price: 4 },
      { size: "S", price: 5 },
    ]);
    expect(message).toContain("only appear once");
  });

  it("rejects more than 3 entries", () => {
    const message = check([
      { size: "S", price: 4 },
      { size: "M", price: 5 },
      { size: "L", price: 6 },
      { size: "S", price: 7 },
    ]);
    expect(message).toContain("at most 3");
  });

  it("accepts 3 different sizes", () => {
    expect(
      check([
        { size: "S", price: 4 },
        { size: "M", price: 5 },
        { size: "L", price: 6 },
      ]),
    ).toBeUndefined();
  });
});
