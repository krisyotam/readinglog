"use client"

import { useState, useEffect } from "react"
import { CollectionCard } from "./collection-card"

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

export function OwnedCollectionsContent() {
  const [collections, setCollections] = useState<Collection[]>([])
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
        setCollections(data.collections)
      })
      .catch((error) => {
        console.error("Error loading owned collections data:", error)
        setError(`Failed to load owned collections data: ${error.message}`)
      })
  }, [])

  if (error) {
    return <div className="text-red-600 dark:text-red-400">{error}</div>
  }

  if (collections.length === 0) {
    return <div className="text-gray-600 dark:text-gray-400">Loading owned collections data...</div>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          id={collection.id}
          slug={`local-${collection.id}`}
          title={collection.title}
          bookCount={collection.books.length}
          books={collection.books}
        />
      ))}
    </div>
  )
}

