'use client';  // Add this at the top to mark this as a Client Component

import { useEffect, useState } from 'react';  // Import React hooks
import Image from "next/image";
import Link from "next/link";
import { FinishedBooks } from "@/components/finished-books";
import { CurrentFavorite } from "@/components/current-favorite";
import { BookClub } from "@/components/book-club";
import { GET_READING_STATES } from "@/lib/queries";
import { getClient } from "@/lib/apollo-client";

// Use async function to fetch data on server side.
export default async function Home() {
  const client = getClient();
  
  // Fetch the data server-side
  const { data } = await client.query({ query: GET_READING_STATES });
  
  // Filter the finished books based on status
  const finished = data?.myReadingStates?.filter(
    (state: { status: string }) => state.status === "FINISHED"
  ) || [];

  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <div className="mb-12">
        <div
          className="w-[100px] h-[100px] relative mb-6 hover:-translate-y-2 hover:scale-105 hover:shadow-lg transition-transform duration-300"
          onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()} // Disable right-click
        >
          <Image
            src="/krisnow.jpg"
            alt="Profile"
            fill
            className="rounded-lg object-cover"
            priority
            draggable={false} // Prevents dragging
          />
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          I'm Kris, Maths student and book enthusiast. Currently tracking through{" "}
          <Link href="https://literal.club" className="underline hover:text-gray-800">
            Literal
          </Link>
          .
        </p>
        <nav className="space-y-2">
          <div>
            <Link href="/activity" className="text-gray-600 hover:text-gray-800">
              Activity
            </Link>
          </div>
          <div>
            <Link href="/collections" className="text-gray-600 hover:text-gray-800">
              Collections
            </Link>
          </div>
          <div>
            <Link href="/notes" className="text-gray-600 hover:text-gray-800">
              Notes
            </Link>
          </div>
          <div>
            <Link href="/library" className="text-gray-600 hover:text-gray-800">
              Library
            </Link>
          </div>
          <div>
            <Link href="/library/log" className="text-gray-600 hover:text-gray-800">
              Log
            </Link>
          </div>
        </nav>
      </div>

      <div className="space-y-12">
        <BookClub />
        <CurrentFavorite />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-medium mb-4">Recently Read</h2>
        <div className="h-px bg-gray-200 mb-6"></div>
        <FinishedBooks books={finished.map((state: { book: any }) => state.book)} />
      </section>
    </main>
  );
}
