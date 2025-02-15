import { NextResponse } from "next/server";
import prisma from "@/libs/db/connect"; // Assuming your Prisma client is here

// PATCH request to update the user domain
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email, domain } = body;

    if (!email || !domain) {
      return NextResponse.json({ error: "Email and domain are required" }, { status: 400 });
    }

    // Check if the domain is already taken
    const existingDomain = await prisma.user.findFirst({
      where: { domain },
    });

    if (existingDomain) {
      return NextResponse.json({ error: "Domain already in use" }, { status: 409 });
    }

    // Update the user's domain
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { domain },
    });

    return NextResponse.json({ message: "Domain updated successfully", user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update domain" }, { status: 500 });
  }
}
