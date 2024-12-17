import prisma from "@/libs/db/connect";

export const createUser = async (data: { name: string; email: string; password: string; domain: string }) => {
  return await prisma.user.create({
    data,
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    include: { blogs: true },
  });
};
