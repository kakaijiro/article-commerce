// "use client";

import Image from "next/image";
import { getDetailBook } from "@/app/lib/microcms/client";
import { User, Purchase, BookType } from "../types/typse";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import PurchasedBookDetail from "../components/PurchasedBookDetail";

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions); // only in SSR
  const user = session?.user as User;

  let purchasedBookDetails: BookType[] = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" } // because of Server-Side Rendering. default is SSR with no-store
    );
    const purchasedData = await response.json();
    purchasedBookDetails = await Promise.all(
      purchasedData.map(
        async (purchase: Purchase) => await getDetailBook(purchase.bookId)
      )
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image
              priority
              src={user?.image || "/default_icon.png"}
              alt="user profile_icon"
              width={60}
              height={60}
              className="rounded-t-md"
            />
          </div>
          <h2 className="text-lg ml-4 font-semibold">User: {user?.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">
        Purchased Articles:
      </span>
      <div className="flex items-center gap-6">
        {purchasedBookDetails.map((book: BookType) => (
          <PurchasedBookDetail key={book.id} detailBook={book} />
        ))}
      </div>
    </div>
  );
}
