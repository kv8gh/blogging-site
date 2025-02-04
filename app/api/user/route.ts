
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db/connect";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, domain } = await req.json();

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: { name, email, password, domain },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user", details: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch all users
    const users = await prisma.user.findMany({
      include: { blogs: true }, // Include related blogs
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
