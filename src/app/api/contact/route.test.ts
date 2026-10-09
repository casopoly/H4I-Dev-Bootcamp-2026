import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/contact/route";
import MessageModel from "@/database/messageSchema";

// Replace the database with fakes, so the tests never touch MongoDB
vi.mock("@/database/db", () => ({ default: vi.fn() }));
vi.mock("@/database/messageSchema", () => ({ default: { create: vi.fn(), find: vi.fn() } }));
const create = vi.mocked(MessageModel.create);
const find = vi.mocked(MessageModel.find);

// What MongoDB hands back for a saved message
const savedDoc = (fields: Record<string, unknown>) => ({
  _id: { toString: () => "6702f1c2a1b2c3d4e5f60718" },
  createdAt: new Date("2026-10-09T18:30:00.000Z"),
  ...fields,
});

const post = (body: string) => POST(new NextRequest("http://localhost/api/contact", { method: "POST", body }));

const validMessage = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Do you have oat milk?",
  type: "contact",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/contact", () => {
  it("saves a valid message and returns 201", async () => {
    // Echo back what was saved, the way MongoDB would
    create.mockImplementation((async (fields: Record<string, unknown>) => savedDoc(fields)) as never);

    const response = await post(JSON.stringify({ ...validMessage, _id: "picked-by-visitor" }));

    expect(response.status).toBe(201);
    // Only the known fields reach the database, so a visitor can't choose the _id
    expect(create).toHaveBeenCalledWith(validMessage);
    expect(await response.json()).toEqual({
      _id: "6702f1c2a1b2c3d4e5f60718",
      ...validMessage,
      createdAt: "2026-10-09T18:30:00.000Z",
    });
  });

  it("saves a message with no type as a contact message", async () => {
    create.mockImplementation((async (fields: Record<string, unknown>) => savedDoc(fields)) as never);
    const { type: _type, ...withoutType } = validMessage;

    const response = await post(JSON.stringify(withoutType));

    expect(response.status).toBe(201);
    expect(create).toHaveBeenCalledWith({ ...withoutType, type: "contact" });
  });

  it("returns 400 with an error per field for invalid input, without saving", async () => {
    const response = await post(JSON.stringify({ ...validMessage, name: "  ", email: "not-an-email" }));

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(Object.keys(body.errors).sort()).toEqual(["email", "name"]);
    expect(create).not.toHaveBeenCalled();
  });

  it("returns 400 for a body that isn't valid JSON", async () => {
    const response = await post("{ name: ");

    expect(response.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });
});

describe("GET /api/contact", () => {
  it("returns the messages newest first", async () => {
    const sort = vi.fn().mockResolvedValue([savedDoc({ ...validMessage, subject: "Hello" })]);
    find.mockReturnValue({ sort } as never);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
    const [message] = await response.json();
    expect(message).toMatchObject({ _id: "6702f1c2a1b2c3d4e5f60718", subject: "Hello" });
  });
});
