import { describe, expect, it } from "vitest";
import MenuItem from "@/database/menuSchema";
import { MENU_SIZES } from "@/constants/menu";

// validateSync checks the schema rules without a database
const base = { name: "Latte", category: "Latte", description: "Nice", image: "/images/menu/x.jpg" };
const sizes = (n: number) => Array.from({ length: n }, (_, i) => ({ size: MENU_SIZES[i % 3], price: 5 + i }));
const validate = (fields: Record<string, unknown>) => new MenuItem({ ...base, ...fields }).validateSync();

describe("menu item schema", () => {
  it("accepts 1 size and 3 sizes", () => {
    expect(validate({ sizes: sizes(1) })).toBeUndefined();
    expect(validate({ sizes: sizes(3) })).toBeUndefined();
  });

  it("rejects 0 sizes and a missing sizes field", () => {
    expect(validate({ sizes: [] })?.errors.sizes).toBeDefined();
    expect(validate({})?.errors.sizes).toBeDefined();
  });

  it("rejects a duplicate size", () => {
    const error = validate({
      sizes: [
        { size: "S", price: 4 },
        { size: "S", price: 5 },
      ],
    });
    expect(error?.errors.sizes.message).toContain("only appear once");
  });

  it("rejects 4 entries and says the limit is 3", () => {
    const error = validate({ sizes: sizes(4) });
    expect(error?.errors.sizes.message).toContain(`between 1 and ${MENU_SIZES.length}`);
  });

  it("rejects a size that doesn't exist", () => {
    expect(validate({ sizes: [{ size: "XL", price: 5 }] })?.errors["sizes.0.size"]).toBeDefined();
  });

  it("rejects a negative price and a price of 0", () => {
    expect(validate({ sizes: [{ size: "S", price: -1 }] })?.errors["sizes.0.price"]).toBeDefined();
    expect(validate({ sizes: [{ size: "S", price: 0 }] })?.errors["sizes.0.price"]).toBeDefined();
  });
});

describe("menu item available field", () => {
  it("defaults to true when it isn't given", () => {
    expect(new MenuItem({ ...base, sizes: sizes(1) }).available).toBe(true);
  });

  it("keeps false", () => {
    expect(new MenuItem({ ...base, sizes: sizes(1), available: false }).available).toBe(false);
  });
});
