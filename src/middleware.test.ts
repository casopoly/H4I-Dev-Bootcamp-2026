import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";
import { ADMIN_COOKIE, adminToken } from "@/lib/adminAuth";

const PASSWORD = "test-password";

// Runs the middleware for one request and reports whether it let the request through
async function run(method: string, path: string, { loggedIn = false } = {}) {
  const request = new NextRequest(`http://localhost${path}`, { method });
  if (loggedIn) request.cookies.set(ADMIN_COOKIE, (await adminToken(PASSWORD))!);
  const response = await middleware(request);
  // NextResponse.next() marks the response with this header; a 401 or redirect does not
  return { passed: response.headers.get("x-middleware-next") === "1", status: response.status };
}

beforeEach(() => {
  vi.stubEnv("ADMIN_PASSWORD", PASSWORD);
});

describe("middleware: contact API", () => {
  it("lets anyone send a message (POST)", async () => {
    expect((await run("POST", "/api/contact")).passed).toBe(true);
  });

  it("answers 401 when reading messages (GET) without the login cookie", async () => {
    expect(await run("GET", "/api/contact")).toEqual({ passed: false, status: 401 });
  });

  it("lets a logged-in admin read messages", async () => {
    expect((await run("GET", "/api/contact", { loggedIn: true })).passed).toBe(true);
  });
});

describe("middleware: menu API (unchanged)", () => {
  it("lets anyone read the menu", async () => {
    expect((await run("GET", "/api/menu")).passed).toBe(true);
  });

  it("answers 401 for writes without the login cookie", async () => {
    expect(await run("PUT", "/api/menu/6702f1c2a1b2c3d4e5f60718")).toEqual({ passed: false, status: 401 });
  });
});
