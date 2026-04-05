import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("__session");

  // Redirect unauthenticated users away from all /admin pages except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session?.value) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Redirect authenticated users away from the login page
  if (pathname === "/admin/login" && session?.value) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
