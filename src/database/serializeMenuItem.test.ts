import { describe, expect, it } from "vitest";
import { Types } from "mongoose";
import MenuItemModel from "@/database/menuSchema";
import { serializeMenuItem } from "@/database/serializeMenuItem";

const fields = {
  name: "Latte",
  category: "Latte",
  sizes: [
    { size: "S", price: 4.95 },
    { size: "M", price: 5.25 },
  ],
  description: "Espresso with steamed milk.",
  image: "/images/menu/drinks/latte.jpg",
};

// What a .lean() query returns (the public menu page uses this): a plain object, but _id is an ObjectId and __v is set
const leanDoc = () => ({ _id: new Types.ObjectId("6702f1c2a1b2c3d4e5f60718"), __v: 0, ...fields }) as never;

describe("serializeMenuItem", () => {
  it("turns the ObjectId _id into a plain string", () => {
    const item = serializeMenuItem(leanDoc());

    expect(item._id).toBe("6702f1c2a1b2c3d4e5f60718");
    expect(typeof item._id).toBe("string");
  });

  it("drops __v and keeps only the MenuItem fields", () => {
    const item = serializeMenuItem(leanDoc());

    expect(item).not.toHaveProperty("__v");
    expect(Object.keys(item).sort()).toEqual(["_id", "available", "category", "description", "image", "name", "sizes"]);
  });

  it("treats an item with no available value as available, and only an explicit false as sold out", () => {
    // Items saved before the field existed have no value, and .lean() doesn't fill in schema defaults
    expect(serializeMenuItem(leanDoc()).available).toBe(true);
    expect(serializeMenuItem({ ...(leanDoc() as object), available: true } as never).available).toBe(true);
    expect(serializeMenuItem({ ...(leanDoc() as object), available: false } as never).available).toBe(false);
  });

  it("copies sizes as plain { size, price } objects, even from a full Mongoose document", () => {
    // A full document (what findById returns, used by the admin edit page) stores sizes in a Mongoose array
    const doc = new MenuItemModel(fields);

    const item = serializeMenuItem(doc);

    expect(item.sizes).toEqual(fields.sizes);
    // A plain array of plain objects, which is what client components can receive
    expect(item.sizes.constructor).toBe(Array);
    for (const size of item.sizes) {
      expect(Object.getPrototypeOf(size)).toBe(Object.prototype);
      expect(Object.keys(size)).toEqual(["size", "price"]);
    }
    // A copy: changing the result doesn't change the document
    item.sizes[0].price = 99;
    expect(doc.sizes[0].price).toBe(4.95);
  });
});
