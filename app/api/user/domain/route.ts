import { authOptions } from "@/libs/utils/auth";
import { getServerSession } from "next-auth";
import prisma from "@/libs/db/connect";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domain } = await req.json();
    if (!domain || domain.length < 3)
      return NextResponse.json({ error: "Invalid domain" }, { status: 400 });

    const userEmail = session.user?.email as string;
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    // If user already has a domain, prevent changes
    // if (user?.domain) {
    //   return NextResponse.json(
    //     { error: "You cannot change your domain once set" },
    //     { status: 400 }
    //   );
    // }

    // Check if domain is already taken
    const existingUser = await prisma.user.findFirst({
      where: { domain },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Domain already in use" },
        { status: 400 }
      );
    }

    // Update user domain
    await prisma.user.update({
      where: { email: userEmail },
      data: { domain },
    });


    const isLocalhost = process.env.NODE_ENV === "development";
  const redirectUrl = isLocalhost
    ? `http://${domain}.localhost:3000`
    : `https://${domain}.mysite.com`;
    // Redirect user to their new domain
    return NextResponse.json(
      {
        message: "Domain registered",
        redirectUrl,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
