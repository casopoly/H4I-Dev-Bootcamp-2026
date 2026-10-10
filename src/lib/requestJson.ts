// Messages shown when a request fails without the server explaining why
export const NETWORK_ERROR = "Could not reach the server. Check your connection and try again.";
export const SERVER_ERROR = "Something went wrong on the server. Try again in a moment.";

export type RequestResult<T> =
  | { ok: true; data: T }
  // status is null when the request never reached the server (offline, server down)
  | { ok: false; status: number | null; error: string; errors?: Record<string, string> };

/**
 * Calls one of our API routes from the browser and never throws: every outcome comes back as a result,
 * so a page can always show a clear message instead of breaking.
 * - success: { ok: true, data } with the parsed JSON body
 * - the server said no (400, 401, 404, 500...): { ok: false, error } with the server's own message when it sent one,
 *   plus `errors` (one message per field) for validation failures
 * - no answer at all (offline, server down): { ok: false, status: null, error: NETWORK_ERROR }
 *
 * Use it for every fetch in a client component, including the contact form and the Apply pop-up
 */
export async function requestJson<T = unknown>(url: string, init?: RequestInit): Promise<RequestResult<T>> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    return { ok: false, status: null, error: NETWORK_ERROR };
  }

  // Our routes always answer with JSON, but a crash or a proxy can send HTML or nothing, so don't trust it
  const body = await response.json().catch(() => null);

  if (response.ok) {
    return { ok: true, data: body as T };
  }

  const error =
    typeof body?.error === "string" && body.error !== ""
      ? body.error
      : response.status >= 500
        ? SERVER_ERROR
        : `Request failed (${response.status})`;
  return { ok: false, status: response.status, error, ...(body?.errors ? { errors: body.errors } : {}) };
}
