"use client";

import { getProviders, signIn } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign in to Your Account</h1>
      <div className="space-y-4">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "/dashboard", // Redirect after sign-in
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
