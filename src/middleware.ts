import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, safeEqual } from "@/lib/adminAuth";

/**
 * Runs before every request that matches `config.matcher` below.
 * - /admin pages without a valid login cookie are redirected to /admin/login
 * - writes to the menu API (POST, PUT, DELETE) without the cookie get a 401
 * - reading the menu (GET) and the login page itself stay public
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isApi = pathname.startsWith("/api/");

  // The login page must be reachable without logging in (otherwise it would redirect forever)
  if (pathname === "/admin/login") return NextResponse.next();
  // Anyone can read the menu
  if (isApi && ["GET", "HEAD", "OPTIONS"].includes(request.method)) return NextResponse.next();

  // If ADMIN_PASSWORD is not set, expected is null and nobody gets in (fail closed)
  const expected = await adminToken(process.env.ADMIN_PASSWORD);
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  if (expected !== null && cookie !== undefined && safeEqual(cookie, expected)) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  // Send the visitor to the login page, remembering where they wanted to go
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/menu/:path*"],
};
