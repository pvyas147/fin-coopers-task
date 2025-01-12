import { NextResponse } from "next/server";

export function middleware(req) {
  const token =
    req.cookies.get("admin_token") || req.headers.get("Authorization");
  const url = req.nextUrl.clone();

  // Protect routes under /dashboard or any admin-specific route
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login"; // Redirect to login if no token
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from accessing the login page
  if (token && url.pathname === "/login") {
    url.pathname = "/dashboard"; // Redirect to dashboard if logged in
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
