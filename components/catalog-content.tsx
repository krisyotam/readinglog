"use client"

import { useState, useEffect } from "react"
import { BookCard } from "./book-card"

interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
  classification: string
  subClassification: string
}

export function CatalogContent() {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/library")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!data.books || !Array.isArray(data.books)) {
          throw new Error("Invalid data structure")
        }
        setBooks(data.books)
      })
      .catch((error) => {
        console.error("Error loading library data:", error)
        setError(`Failed to load library data: ${error.message}`)
      })
  }, [])

  if (error) {
    return <div className="text-red-600 dark:text-red-400">{error}</div>
  }

  if (books.length === 0) {
    return <div className="text-gray-600 dark:text-gray-400">Loading catalog data...</div>
  }

  const groupedBooks = books.reduce(
    (acc, book) => {
      if (book && book.classification) {
        if (!acc[book.classification]) {
          acc[book.classification] = []
        }
        acc[book.classification].push(book)
      }
      return acc
    },
    {} as Record<string, Book[]>,
  )

  return (
    <div className="space-y-12">
      {Object.entries(groupedBooks).map(([classification, books]) => (
        <section key={classification}>
          <h2 className="text-xl mb-6">{getClassificationName(classification)}</h2>
          <div className="grid grid-cols-2 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} coverUrl={book.coverUrl} title={book.title} author={book.author} rating={0} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function getClassificationName(classification: string): string {
  const classifications: Record<string, string> = {
    A: "General Works",
    B: "Philosophy, Psychology, Religion",
    C: "Auxiliary Sciences of History",
    D: "World History",
    E: "History of the Americas",
    F: "History of the Americas",
    G: "Geography, Anthropology, Recreation",
    H: "Social Sciences",
    J: "Political Science",
    K: "Law",
    L: "Education",
    M: "Music",
    N: "Fine Arts",
    P: "Language and Literature",
    Q: "Science",
    R: "Medicine",
    S: "Agriculture",
    T: "Technology",
    U: "Military Science",
    V: "Naval Science",
    Z: "Bibliography, Library Science, Information Resources",
  }
  return classifications[classification] || "Unknown Classification"
}

