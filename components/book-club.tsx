"use client"

import { useQuery, gql } from "@apollo/client"
import { BookCard } from "./book-card"
import Link from "next/link"
import bookClubData from "@/data/book-club.json"

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

export function BookClub() {
  const { data, loading, error } = useQuery(GET_BOOK_BY_ISBN, {
    variables: { isbn13: bookClubData.isbn13 },
    fetchPolicy: "network-only",
  })

  if (loading) return <p className="text-gray-600">Loading book club selection...</p>
  if (error) {
    console.error("Error fetching book club selection:", error)
    return <p className="text-gray-600">Error loading book club selection: {error.message}</p>
  }

  const book = data?.book

  if (!book) {
    console.warn("No book club selection found")
    return <p className="text-gray-600">No book club selection found.</p>
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">
        <Link href={bookClubData.link} className="hover:underline">
          Book Club
        </Link>
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

