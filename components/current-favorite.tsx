"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { BookCard } from "./book-card"
import { GET_BOOK_BY_ISBN } from "@/lib/queries"
import type { Book } from "@/types/book"
import { fetchData } from "@/lib/fetchData"

interface CurrentFavoriteData {
  isbn13: string
}

export default function CurrentFavorite() {
  const [currentFavoriteData, setCurrentFavoriteData] = useState<CurrentFavoriteData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData<CurrentFavoriteData>("/api/current-favorite")
      .then(setCurrentFavoriteData)
      .catch((error) => {
        console.error("Error loading current favorite data:", error)
        setError("Failed to load current favorite data. Please try again later.")
      })
  }, [])

  const {
    data,
    loading,
    error: queryError,
  } = useQuery<{ book: Book }>(GET_BOOK_BY_ISBN, {
    variables: { isbn13: currentFavoriteData?.isbn13 },
    skip: !currentFavoriteData,
    fetchPolicy: "network-only",
  })

  if (loading) return <p className="text-gray-600">Loading favorite book...</p>
  if (error || queryError) return <p className="text-red-600">{error || queryError?.message}</p>

  const book = data?.book

  if (!book) {
    return <p className="text-gray-600">No favorite book found.</p>
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">Current Favorite</h2>
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

