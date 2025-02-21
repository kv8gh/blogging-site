import prisma from "@/libs/db/connect";
import { authOptions } from "@/libs/utils/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 }
      );
    }

    const userEmail = session.user?.email as string;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userDomain = session.user?.domain as string;

    // Only allow blog creation if the user owns the domain
    if (user.domain !== userDomain) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
