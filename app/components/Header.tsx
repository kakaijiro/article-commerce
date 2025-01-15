// "use client";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../types/typse";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions); // only in SSR
  const user = session?.user as User;

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
    </header>
  );
};

export default Header;
