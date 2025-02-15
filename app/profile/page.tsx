"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const [domain, setDomain] = useState("");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state while fetching session
  }

  const handleDomainUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) return;

    const response = await fetch("/api/user/domain", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        domain,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Domain updated successfully!");
    } else {
      setMessage(data.error || "Failed to update domain.");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>

      {session ? (
        <>
          <p>Welcome, {session.user?.name || "User"}!</p>
          <p>Email: {session.user?.email}</p>

          <form onSubmit={handleDomainUpdate} className="mt-4">
            <input
              type="text"
              placeholder="Enter your custom domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update Domain
            </button>
          </form>

          {message && <p className="mt-2 text-green-600">{message}</p>}
        </>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
}
