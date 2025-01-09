"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Article Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Login
          </Link>

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
