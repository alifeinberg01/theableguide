import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("__session");

  const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/reset-password"];

  // Redirect unauthenticated users away from all /admin pages except the
  // public login/password-reset pages
  if (pathname.startsWith("/admin") && !PUBLIC_ADMIN_PATHS.includes(pathname)) {
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
