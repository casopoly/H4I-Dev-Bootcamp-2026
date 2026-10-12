import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { DELETE } from "@/app/api/menu/[id]/route";
import MenuItemModel from "@/database/menuSchema";

// Replace the database with fakes, so the tests never touch MongoDB
vi.mock("@/database/db", () => ({ default: vi.fn() }));
vi.mock("@/database/menuSchema", () => ({ default: { findByIdAndDelete: vi.fn() } }));
const findByIdAndDelete = vi.mocked(MenuItemModel.findByIdAndDelete);

const ID = "6702f1c2a1b2c3d4e5f60718";
const del = (id: string) =>
  DELETE(new NextRequest(`http://localhost/api/menu/${id}`, { method: "DELETE" }), { params: { id } });

beforeEach(() => {
  vi.clearAllMocks();
});

describe("DELETE /api/menu/[id]", () => {
  it("returns 400 for an invalid id, without asking the database", async () => {
    expect((await del("not-an-id")).status).toBe(400);
    expect(findByIdAndDelete).not.toHaveBeenCalled();
  });

  it("returns 404 when no item has that id", async () => {
    findByIdAndDelete.mockResolvedValue(null as never);

    expect((await del(ID)).status).toBe(404);
  });

  it("returns 200 when the item is deleted", async () => {
    findByIdAndDelete.mockResolvedValue({ _id: ID } as never);

    const response = await del(ID);

    expect(response.status).toBe(200);
    expect(findByIdAndDelete).toHaveBeenCalledWith(ID);
  });
});
