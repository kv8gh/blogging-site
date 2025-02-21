import NextAuth, { NextAuthOptions, Session,User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/libs/db/connect' // Your Prisma Client
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

type CustomSession = Session & {
  user?: {
    id: string;
  };
};

declare module 'next-auth'{
  interface Session{
    user: {
      name: string;
      email: string;
      image: string;
      domain: string | null;
    }
  }
}



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Email/Password Authentication
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate email and password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      console.log("User signing in:", user?.email);

      // Handle both Google and credentials users
      if (account?.provider === "credentials" || account?.provider === "google") {
        // Optional: Check custom conditions before allowing sign-in
        console.log('nnnnnnnnnnnnnnnn',account.provider);
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = { id: user.id, email: user.email, name: user.name };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};


