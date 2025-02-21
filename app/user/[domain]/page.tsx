"use client";

import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function UserProfile({ params }: { params: { domain: string } }) {
  const { data: session } = useSession(); // Get logged-in user
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostBlog = async () => {
    if (!title || !content) return alert("Title and content are required!");

    const response = await fetch("/api/blog/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Error posting blog");
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-500">
      <h1 className="text-3xl font-bold">{params.domain}'s Blog</h1>
      <p className="text-black">Welcome to {params.domain}'s blog!</p>

      {/* If the logged-in user owns this blog, show the blog posting form */}
      {session?.user?.domain === params.domain && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold text-black">Post a New Blog</h2>
          <input
            type="text"
            placeholder="Blog Title"
            className="border p-2 w-full mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Blog Content"
            className="border p-2 w-full mt-2"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            onClick={handlePostBlog}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Publish Blog
          </button>
        </div>
      )}

      {/* Blog Posts */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Recent Blogs</h2>
        {/* Fetch and display blogs here */}
      </div>
    </main>
  );
}
