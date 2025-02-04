"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import MainButton from "@/component/mainButton";

export default function Page() {
  const { data: session } = useSession(); // Get session data

  return (
    <main className="min-h-screen">
      <h1>Welcome to my blogging page</h1>

      {session ? (
        // If user is authenticated
        <>
          <p>Welcome back, {session.user?.name || "User"}!</p>
          <p>Your email: {session.user?.email}</p>
          <button onClick={() => signOut()} className="btn">
            Sign Out
          </button>
        </>
      ) : (
        // If user is not authenticated
        <>
          <p>This is a sample blog post</p>
          <button
            onClick={() => {
              signIn("google");
              console.log("clicked");
            }}
            className="btn p-2 border border-yellow-700 "
          >
            Sign In with Google
          </button>
        </>
      )}

      <MainButton />

      <form>
        <input type="text" placeholder="Enter your name" className="input" />
      </form>
    </main>
  );
}
