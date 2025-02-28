"use client"

import { useState, useEffect } from "react"
import { BookCard } from "./book-card"

interface Book {
  id: string
  title: string
  author: string
  cover: string
}

interface Collection {
  id: string
  title: string
  description: string
  books: Book[]
}

export function LocalCollectionContent({ slug }: { slug: string }) {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/local-collections")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!data.collections || !Array.isArray(data.collections)) {
          throw new Error("Invalid data structure")
        }
        const foundCollection = data.collections.find((c) => `local-${c.id}` === slug)
        if (!foundCollection) {
          throw new Error("Collection not found")
        }
        setCollection(foundCollection)
      })
      .catch((error) => {
        console.error("Error loading local collection data:", error)
        setError(`Failed to load local collection data: ${error.message}`)
      })
  }, [slug])

  if (error) {
    return <div className="text-red-600 dark:text-red-400">{error}</div>
  }

  if (!collection) {
    return <div className="text-gray-600 dark:text-gray-400">Loading local collection data...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{collection.title}</h2>
        {collection.description && <p className="text-gray-600 dark:text-gray-400">{collection.description}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collection.books.map((book) => (
          <BookCard key={book.id} coverUrl={book.cover} title={book.title} author={book.author} rating={0} />
        ))}
      </div>
    </div>
  )
}

