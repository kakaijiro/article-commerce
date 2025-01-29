"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { User } from "../types/typse";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import SessionDebug from "./SessionDebug";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession(); // only in SSR
  const user = session?.user as User | undefined;
  console.log(user);

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Article Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href={"/"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href={user ? "/profile" : "/api/auth/signin"}
            // href={user ? "/profile" : "/login"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {user ? "Profile" : "Login"}
          </Link>

          {user ? (
            <Link
              href={"/api/auth/signout"}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </Link>
          ) : (
            ""
          )}

          <Link href={`/profile`}>
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <Image
                width={50}
                height={50}
                alt="profile_icon"
                src={user?.image || "/default_icon.png"}
              />
            </div>
          </Link>
        </div>
      </nav>
      <SessionDebug />
    </header>
  );
};

export default Header;
