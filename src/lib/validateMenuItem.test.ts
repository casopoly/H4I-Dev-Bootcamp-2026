import { describe, expect, it } from "vitest";
import { validateMenuItem } from "@/lib/validateMenuItem";

const validItem = {
  name: "Latte",
  category: "Hot Drinks",
  sizes: [
    { size: "S", price: 4.95 },
    { size: "M", price: 5.25 },
  ],
  description: "Espresso with steamed milk.",
  image: "/images/menu/drinks/latte.jpg",
};

// These tests check which fields are rejected, not the wording of the messages, so the messages can change freely
const invalidFields = (input: Record<string, unknown>, options?: { partial?: boolean }) =>
  Object.keys(validateMenuItem(input, options));

describe("validateMenuItem", () => {
  it("accepts a valid item", () => {
    expect(validateMenuItem(validItem)).toEqual({});
  });

  it("rejects an empty or blank name", () => {
    expect(invalidFields({ ...validItem, name: "" })).toEqual(["name"]);
    expect(invalidFields({ ...validItem, name: "   " })).toEqual(["name"]);
  });

  it("rejects a category that is not on the menu", () => {
    expect(invalidFields({ ...validItem, category: "Sandwiches" })).toEqual(["category"]);
  });

  it("rejects a size other than S, M or L", () => {
    expect(invalidFields({ ...validItem, sizes: [{ size: "XL", price: 6 }] })).toEqual(["sizes"]);
  });

  it("rejects a negative price and a price given as text", () => {
    expect(invalidFields({ ...validItem, sizes: [{ size: "S", price: -1 }] })).toEqual(["sizes"]);
    expect(invalidFields({ ...validItem, sizes: [{ size: "S", price: "5" }] })).toEqual(["sizes"]);
  });

  it("rejects an item with no sizes", () => {
    expect(invalidFields({ ...validItem, sizes: [] })).toEqual(["sizes"]);
    expect(invalidFields({ ...validItem, sizes: undefined })).toEqual(["sizes"]);
  });

  it("only accepts images that are under /images/", () => {
    expect(invalidFields({ ...validItem, image: "https://example.com/latte.jpg" })).toEqual(["image"]);
    expect(invalidFields({ ...validItem, image: "" })).toEqual(["image"]);
  });

  describe("partial mode (used by PUT)", () => {
    it("only checks the fields that are present", () => {
      expect(validateMenuItem({ name: "Mocha" }, { partial: true })).toEqual({});
      expect(invalidFields({ name: "" }, { partial: true })).toEqual(["name"]);
    });

    it("still rejects a bad value in a field that is present", () => {
      expect(invalidFields({ name: "Mocha", category: "Sandwiches" }, { partial: true })).toEqual(["category"]);
    });

    it("checks every field when partial is off", () => {
      expect(invalidFields({ name: "Mocha" }).sort()).toEqual(["category", "description", "image", "sizes"]);
    });
  });
});
