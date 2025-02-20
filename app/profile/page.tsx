"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [domain, setDomain] = useState("");
  const [userDomain, setUserDomain] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch user domain on load
    const fetchDomain = async () => {
      const res = await fetch("/api/user/me"); // Create a route to get user data
      const data = await res.json();
      if (data.domain) setUserDomain(data.domain);
    };
    fetchDomain();
  }, []);

  const updateDomain = async () => {
    const res = await fetch("/api/user/domain", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Domain registered successfully! Redirecting...");
      console.log(data);
      router.push(data.redirectUrl); // Redirect to subdomain
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p>Welcome, {session?.user?.name || "User"}!</p>

      {userDomain ? (
        <p className="text-green-600 mt-4">
          Your domain: <strong>{userDomain}.mysite.com</strong>
        </p>
      ) : (
        <div className="mt-4">
          <label className="block font-semibold">Set Custom Domain</label>
          <input
            type="text"
            placeholder="Enter a domain (e.g., myblog)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={updateDomain}
            className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
          >
            Save Domain
          </button>
        </div>
      )}
    </main>
  );
}
