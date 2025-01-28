import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";

const handler = NextAuth(nextAuthOptions as AuthOptions);

export { handler as GET, handler as POST };
