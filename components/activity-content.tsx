"use client"

import { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_READING_STATES } from "@/lib/queries"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"

type ReadingStatus = "IS_READING" | "FINISHED" | "WANTS_TO_READ"

export function ActivityContent() {
  const [activeStatus, setActiveStatus] = useState<ReadingStatus>("IS_READING")
  const { data, loading, error } = useQuery(GET_READING_STATES)

  if (loading) return <p className="text-gray-600 dark:text-gray-400">Loading...</p>
  if (error) return <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>

  const readingStates = data?.myReadingStates || []

  const filteredBooks = readingStates.filter((state) => state.status === activeStatus)

  const statusLabels: Record<ReadingStatus, string> = {
    IS_READING: "Reading",
    FINISHED: "Read",
    WANTS_TO_READ: "Want to Read",
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 mb-8">
        {Object.entries(statusLabels).map(([status, label]) => (
          <Button
            key={status}
            variant={activeStatus === status ? "default" : "outline"}
            onClick={() => setActiveStatus(status as ReadingStatus)}
            className="flex-1"
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="space-y-6">
        {filteredBooks.map((state) => (
          <BookCard
            key={state.book.id}
            coverUrl={state.book.cover}
            title={state.book.title}
            subtitle={state.book.subtitle || ""}
            author={state.book.authors.map((a) => a.name).join(", ")}
            rating={0}
          />
        ))}
      </div>
      {filteredBooks.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400 text-center">No books in this category yet.</p>
      )}
    </div>
  )
}

