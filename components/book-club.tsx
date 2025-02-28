"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { BookCard } from "./book-card"
import Link from "next/link"
import { GET_BOOK_BY_ISBN } from "@/lib/queries"
import type { Book } from "@/types/book"
import { fetchData } from "@/lib/fetchData"

interface BookClubData {
  isbn13: string
  link: string
}

export default function BookClub() {
  const [bookClubData, setBookClubData] = useState<BookClubData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData<BookClubData>("/api/book-club")
      .then(setBookClubData)
      .catch((error) => {
        console.error("Error loading book club data:", error)
        setError("Failed to load book club data. Please try again later.")
      })
  }, [])

  const {
    data,
    loading,
    error: queryError,
  } = useQuery<{ book: Book }>(GET_BOOK_BY_ISBN, {
    variables: { isbn13: bookClubData?.isbn13 },
    skip: !bookClubData,
    fetchPolicy: "network-only",
  })

  if (loading) return <p className="text-gray-600">Loading book club selection...</p>
  if (error || queryError) return <p className="text-red-600">{error || queryError?.message}</p>

  const book = data?.book

  if (!book) {
    return <p className="text-gray-600">No book club selection found.</p>
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">
        {bookClubData && (
          <Link href={bookClubData.link} className="hover:underline">
            Book Club
          </Link>
        )}
      </h2>
      <BookCard
        coverUrl={book.cover}
        title={book.title}
        subtitle={book.subtitle}
        author={book.authors.map((a) => a.name).join(", ")}
        rating={0}
      />
    </div>
  )
}

