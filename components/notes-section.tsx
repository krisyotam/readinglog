"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookNoteModal } from "./book-note-modal"
import { useState, useEffect } from "react"
import { fetchBookNotes } from "@/lib/fetchBookNotes"

interface BookNote {
  id: string
  title: string
  author: string
  year: number
  coverImage: string
  goodreadsLink: string
  grammar: {
    part1: string
    part2: string
  }
  logic: string
  rhetoric: string
  review: string
}

export function NotesSection() {
  const [notes, setNotes] = useState<BookNote[]>([])
  const [selectedBook, setSelectedBook] = useState<BookNote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNotes() {
      try {
        const fetchedNotes = await fetchBookNotes()
        setNotes(fetchedNotes)
      } catch (err) {
        setError("Failed to load notes. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadNotes()
  }, [])

  if (isLoading) {
    return <p className="text-gray-600">Loading notes...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (notes.length === 0) {
    return <p className="text-gray-600">No notes available.</p>
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((book) => (
            <TableRow key={book.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedBook(book)}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="text-right">{book.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedBook && (
        <BookNoteModal book={selectedBook} isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  )
}

