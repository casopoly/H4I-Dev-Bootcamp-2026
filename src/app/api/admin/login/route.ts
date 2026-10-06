import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, safeEqual } from "@/lib/adminAuth";

// Never cache a login check
export const dynamic = "force-dynamic";

const EIGHT_HOURS = 60 * 60 * 8;

/**
 * Checks the submitted password against ADMIN_PASSWORD and, if it matches, sets the login cookie
 */
export async function POST(request: NextRequest) {
  const expected = await adminToken(process.env.ADMIN_PASSWORD);
  if (!expected) {
    return NextResponse.json({ error: "Admin login is not set up (ADMIN_PASSWORD is missing)" }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const password = typeof body?.password === "string" ? body.password : "";
  const submitted = await adminToken(password);
  if (!submitted || !safeEqual(submitted, expected)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true, // not readable from JavaScript in the browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: EIGHT_HOURS,
  });
  return response;
}
