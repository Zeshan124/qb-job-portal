import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/portal"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal"],
};
