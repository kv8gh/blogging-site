import NextAuth, { NextAuthOptions, Session,User } from "next-auth";
import { authOptions } from "@/libs/utils/auth";

const handler =  NextAuth(authOptions);

export {handler as GET,handler as POST};
