"use client"

import type { Book } from "@/types/book"

interface FinishedBooksProps {
  books: Book[]
}

export default function FinishedBooks({ books }: FinishedBooksProps) {
  return (
    <div className="space-y-6">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="flex justify-between items-baseline">
            <div className="text-gray-800 hover:text-gray-600 cursor-default">{book.title}</div>
            <span className="text-gray-500 text-sm">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        ))
      ) : (
        <p>No finished books to display.</p>
      )}
    </div>
  )
}

