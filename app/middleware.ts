import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Define protected routes (only accessible if authenticated)
  const protectedRoutes = ["/portal"]; // Add your protected routes here

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/admin", req.url)); // Redirect to login
  }

  return NextResponse.next(); // Continue if authenticated or not a protected route
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/portal"], // Adjust as needed
};
