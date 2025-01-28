import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { userAgent } from "next/server";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
  // debug: false,
  debug: process.env.NODE_ENV === "development",
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: (() => {
    try {
      return PrismaAdapter(prisma);
    } catch (error) {
      console.error("PrismaAdapter error:", error);
      throw error;
    }
  })(),
  callbacks: {
    session: async ({ session, user }) => {
      try {
        if (session?.user) session.user.id = user.id;

        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        };
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
    // JWT処理の追加
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // added
  useSecureCookies: process.env.NODE_ENV === "production", // 本番環境ではセキュアクッキーを使用
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: {
    strategy: "jwt", // JWTベースのセッション管理を明示的に設定
    // maxAge: 30 * 24 * 60 * 60, // セッションの有効期限（例：30日）
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string;
      name?: string;
      image?: string;
    };
  }
}
