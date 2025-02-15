import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || ""; // Get request host
  const mainDomain = "yoursite.com"; // Replace with your actual domain

  // Check if it's a subdomain (e.g., username.yoursite.com)
  if (hostname.endsWith(`.${mainDomain}`)) {
    const subdomain = hostname.split(`.${mainDomain}`)[0]; // Extract subdomain

    // Redirect subdomain requests to the user profile page
    return NextResponse.rewrite(new URL(`/user/${subdomain}`, req.url));
  }

  return NextResponse.next(); // Continue normal processing
}
