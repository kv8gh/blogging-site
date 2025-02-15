import  prisma  from "@/libs/db/connect"
import { notFound } from "next/navigation";

export default async function UserProfile({ params }: { params: { domain: string } }) {
  const user = await prisma.user.findFirst({
    where: { domain: params.domain }, // Find user by domain
    include: { blogs: true }, // Fetch user's blogs
  });

  if (!user) return notFound();

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-3xl font-bold">{user.name}'s Blog</h1>
      <p className="text-gray-500">Welcome to {user.name}'s blog!</p>

      {user.blogs.length > 0 ? (
        user.blogs.map((blog) => (
          <article key={blog.id} className="mt-4 p-4 border rounded-lg">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
          </article>
        ))
      ) : (
        <p>No blogs posted yet.</p>
      )}
    </main>
  );
}
