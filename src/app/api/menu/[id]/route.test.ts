import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET, PUT } from "@/app/api/menu/[id]/route";
import MenuItemModel from "@/database/menuSchema";

// Replace the database with fakes, so the tests never touch MongoDB
vi.mock("@/database/db", () => ({ default: vi.fn() }));
vi.mock("@/database/menuSchema", () => ({ default: { findById: vi.fn(), findByIdAndUpdate: vi.fn() } }));
const findById = vi.mocked(MenuItemModel.findById);
const findByIdAndUpdate = vi.mocked(MenuItemModel.findByIdAndUpdate);

const ID = "6702f1c2a1b2c3d4e5f60718";
const savedItem = {
  _id: { toString: () => ID },
  name: "Latte",
  category: "Hot Drinks",
  sizes: [{ size: "M", price: 5.25 }],
  description: "Espresso with steamed milk.",
  image: "/images/menu/drinks/latte.jpg",
};

const params = (id: string) => ({ params: { id } });
const get = (id: string) => GET(new NextRequest(`http://localhost/api/menu/${id}`), params(id));
const put = (id: string, body: unknown) =>
  PUT(new NextRequest(`http://localhost/api/menu/${id}`, { method: "PUT", body: JSON.stringify(body) }), params(id));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/menu/[id]", () => {
  it("returns 400 for an id that isn't a valid ObjectId, without asking the database", async () => {
    const response = await get("not-an-id");

    expect(response.status).toBe(400);
    expect(findById).not.toHaveBeenCalled();
  });

  it("returns 404 when no item has that id", async () => {
    findById.mockResolvedValue(null);

    expect((await get(ID)).status).toBe(404);
  });

  it("returns the item with a string _id", async () => {
    findById.mockResolvedValue(savedItem);

    const response = await get(ID);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ _id: ID, name: "Latte" });
  });
});

describe("PUT /api/menu/[id]", () => {
  it("returns 400 with an error per field for bad fields, without saving", async () => {
    const response = await put(ID, { name: "", sizes: [{ size: "XL", price: -1 }] });

    expect(response.status).toBe(400);
    expect(Object.keys((await response.json()).errors).sort()).toEqual(["name", "sizes"]);
    expect(findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it("returns 404 when no item has that id", async () => {
    findByIdAndUpdate.mockResolvedValue(null);

    expect((await put(ID, { name: "Oat Latte" })).status).toBe(404);
  });

  it("saves only the fields sent and returns the updated item", async () => {
    findByIdAndUpdate.mockResolvedValue({ ...savedItem, name: "Oat Latte" });

    const response = await put(ID, { name: "Oat Latte" });

    expect(response.status).toBe(200);
    expect(findByIdAndUpdate).toHaveBeenCalledWith(ID, { name: "Oat Latte" }, expect.objectContaining({ new: true }));
    expect(await response.json()).toMatchObject({ _id: ID, name: "Oat Latte" });
  });
});
