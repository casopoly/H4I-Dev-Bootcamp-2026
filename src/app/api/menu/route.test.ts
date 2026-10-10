import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/menu/route";
import MenuItemModel from "@/database/menuSchema";
import { MENU_PLACEHOLDER_IMAGE } from "@/constants/menu";

// Replace the database with fakes, so the tests never touch MongoDB
vi.mock("@/database/db", () => ({ default: vi.fn() }));
vi.mock("@/database/menuSchema", () => ({ default: { create: vi.fn(), find: vi.fn() } }));
const create = vi.mocked(MenuItemModel.create);

// What MongoDB hands back for a saved item
const savedDoc = (fields: Record<string, unknown>) => ({
  _id: { toString: () => "6702f1c2a1b2c3d4e5f60718" },
  ...fields,
});

const post = (body: string) => POST(new NextRequest("http://localhost/api/menu", { method: "POST", body }));

const validItem = {
  name: "Honey Latte",
  category: "Hot Drinks",
  sizes: [
    { size: "S", price: 4.5 },
    { size: "M", price: 5 },
  ],
  description: "Espresso, steamed milk and local honey.",
  image: "/images/menu/drinks/honey-latte.jpg",
};

beforeEach(() => {
  vi.clearAllMocks();
  // Echo back what was saved, the way MongoDB would
  create.mockImplementation((async (fields: Record<string, unknown>) => savedDoc(fields)) as never);
});

describe("POST /api/menu", () => {
  it("saves a valid item and returns 201 with it", async () => {
    const response = await post(JSON.stringify({ ...validItem, _id: "picked-by-client" }));

    expect(response.status).toBe(201);
    // Only the known fields reach the database, so the client can't choose the _id
    expect(create).toHaveBeenCalledWith(validItem);
    expect(await response.json()).toEqual({ _id: "6702f1c2a1b2c3d4e5f60718", ...validItem });
  });

  it("gives an item with no image the placeholder image", async () => {
    const { image: _image, ...withoutImage } = validItem;

    const response = await post(JSON.stringify(withoutImage));

    expect(response.status).toBe(201);
    expect(create).toHaveBeenCalledWith({ ...withoutImage, image: MENU_PLACEHOLDER_IMAGE });
  });

  it("checks every field, so an empty object gets an error per field and isn't saved", async () => {
    const response = await post("{}");

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(Object.keys(body.errors).sort()).toEqual(["category", "description", "name", "sizes"]);
    expect(create).not.toHaveBeenCalled();
  });

  it("returns 400 for an image path outside /images/, without saving", async () => {
    const response = await post(JSON.stringify({ ...validItem, image: "https://example.com/latte.jpg" }));

    expect(response.status).toBe(400);
    expect(Object.keys((await response.json()).errors)).toEqual(["image"]);
    expect(create).not.toHaveBeenCalled();
  });

  it("returns 400 for a body that isn't valid JSON", async () => {
    const response = await post("{ name: ");

    expect(response.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });
});
