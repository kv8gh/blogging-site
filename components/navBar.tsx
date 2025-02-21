"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-green-900 text-yellow-600 p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl text-yellow-400 font-bold cursor-pointer">My Blogging Site</h1>
      </Link>

      <div className="space-x-4">
        <Link href="/profile" className="hover:underline">
          Profile
        </Link>

        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
