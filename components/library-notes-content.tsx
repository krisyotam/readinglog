"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LibraryNote {
  id: string
  date: string
  title: string
  content: string
}

export function LibraryNotesContent() {
  const [notes, setNotes] = useState<LibraryNote[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/library-notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (!data.notes || !Array.isArray(data.notes)) {
          throw new Error("Invalid data structure")
        }
        setNotes(data.notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      })
      .catch((error) => {
        console.error("Error loading library notes data:", error)
        setError(`Failed to load library notes data: ${error.message}`)
      })
  }, [])

  if (error) {
    return <div className="text-red-600 dark:text-red-400">{error}</div>
  }

  if (notes.length === 0) {
    return <div className="text-gray-600 dark:text-gray-400">Loading library notes data...</div>
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{new Date(note.date).toLocaleDateString()}</p>
            <p className="text-sm">{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

