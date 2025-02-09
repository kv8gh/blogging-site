"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserProfile {
  name: string | null;
  email: string | null;
  domain: string | null;
  blogs: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }[];
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (session) {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [session]);

  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <main className="min-h-screen p-4 bg-gray-400">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      {userData ? (
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {userData.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Domain:</strong> {userData.domain || "No domain set"}
          </p>
          <h2 className="text-2xl font-semibold mt-6">Your Blogs</h2>
          {userData.blogs.length > 0 ? (
            userData.blogs.map((blog) => (
              <div key={blog.id} className="border-b py-2">
                <h3 className="font-bold">{blog.title}</h3>
                <p>{blog.content}</p>
                <small className="text-gray-500">
                  Created At: {new Date(blog.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      ) : (
        <p>Loading your profile...</p>
      )}

      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Sign Out
      </button>
    </main>
  );
}
