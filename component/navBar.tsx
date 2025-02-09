// components/Navbar.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <div className="text-xl font-bold">My Blogging Page</div>
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-700"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}


