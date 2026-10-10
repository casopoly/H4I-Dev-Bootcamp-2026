import { afterEach, describe, expect, it, vi } from "vitest";
import { NETWORK_ERROR, SERVER_ERROR, requestJson } from "@/lib/requestJson";

// Makes the next fetch call answer with this status and body
function respondWith(status: number, body: string) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, { status })));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("requestJson", () => {
  it("returns the parsed body on success", async () => {
    respondWith(200, JSON.stringify([{ name: "Cold Brew" }]));

    expect(await requestJson("/api/menu")).toEqual({ ok: true, data: [{ name: "Cold Brew" }] });
  });

  it("returns the network message when the server can't be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    expect(await requestJson("/api/menu")).toEqual({ ok: false, status: null, error: NETWORK_ERROR });
  });

  it("passes on the server's message and field errors", async () => {
    respondWith(400, JSON.stringify({ error: "Name is required", errors: { name: "Name is required" } }));

    expect(await requestJson("/api/menu", { method: "POST" })).toEqual({
      ok: false,
      status: 400,
      error: "Name is required",
      errors: { name: "Name is required" },
    });
  });

  it("uses a friendly message when a server error has no JSON body", async () => {
    respondWith(502, "<html>Bad Gateway</html>");

    expect(await requestJson("/api/menu")).toEqual({ ok: false, status: 502, error: SERVER_ERROR });
  });
});
