"use client"

import { useQuery, gql } from "@apollo/client"
import { BookCard } from "./book-card"

const GET_BOOK_BY_ISBN = gql`
  query GetBookByIsbn($isbn13: String!) {
    book(where: {isbn13: $isbn13}) {
      id
      slug
      title
      subtitle
      authors {
        name
      }
      cover
    }
  }
`

export function CurrentFavorite() {
  const { data, loading, error } = useQuery(GET_BOOK_BY_ISBN, {
    variables: { isbn13: "9780679723165" },
    fetchPolicy: "network-only", // This ensures fresh data on each reload
  })

  if (loading) return <p className="text-gray-600">Loading favorite book...</p>
  if (error) {
    console.error("Error fetching current favorite book:", error)
    return <p className="text-gray-600">Error loading favorite book: {error.message}</p>
  }

  const book = data?.book

  if (!book) {
    console.warn("No favorite book found")
    return <p className="text-gray-600">No favorite book found.</p>
  }

  console.log("Current favorite book fetched successfully:", book)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">Current Favorite</h2>
      <BookCard
        coverUrl={book.cover}
        title={book.title}
        subtitle={book.subtitle}
        author={book.authors.map((a: { name: string }) => a.name).join(", ")}
        rating={0}
      />
    </div>
  )
}

