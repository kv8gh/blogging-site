import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const mainDomain = "localhost:3000"; // Change in production

  // ✅ Allow auth routes & static assets to bypass middleware
  if (
    req.nextUrl.pathname.startsWith("/api/auth") || 
    req.nextUrl.pathname.startsWith("/_next") || 
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Extract subdomain (e.g., user.localhost:3000)
  let subdomain = "";
  if (hostname.includes(`.${mainDomain}`)) {
    subdomain = hostname.split(`.${mainDomain}`)[0];
  }

  if (!subdomain) {
    return NextResponse.next();
  }

  // ✅ Check if user is authenticated
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.rewrite(new URL(`/user/${subdomain}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // Exclude static files
};
