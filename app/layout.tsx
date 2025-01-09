import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { NextAuthProvider } from "./lib/next-auth/provider";

const noteSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Article Commerce",
  description: "next app for article commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={noteSansJP.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
