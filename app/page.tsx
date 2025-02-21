// pages/index.js
"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/navBar";
import MainButton from "@/components/mainButton";

export default function Page() {
  const { data: session } = useSession(); // Get session data

  return (
    <div className="min-h-screen bg-gray-400">
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold text-orange-600">Welcome to My Blogging Page</h1>

        {session ? (
          // If user is authenticated
          <>
            <p>Welcome back, {session.user?.name || "User"}!</p>
            <p>Your email: {session.user?.email}</p>
          </>
        ) : (
          // If user is not authenticated
          <>
            <p>This is a sample blog post</p>
          </>
        )}

        <MainButton />

        <form className="mt-4">
          <input
            type="text"
            placeholder="Write a blog"
            className="border p-2 w-full rounded-md"
          />
        </form>
      </main>
    </div>
  );
}