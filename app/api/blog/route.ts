import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db/connect";

export async function POST(req: NextRequest) {
  try {
    const { title, content, authorId } = await req.json();

    // Create a new blog and relate it to an existing user
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog", details: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch all blogs
    const blogs = await prisma.blog.findMany({
      include: { author: true }, // Include the author details
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
