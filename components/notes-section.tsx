"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookNoteModal } from "./book-note-modal"
import { fetchBookNotes } from "@/lib/fetchBookNotes"

export function NotesSection() {
  const [bookNotes, setBookNotes] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBookNotes = async () => {
      try {
        const notes = await fetchBookNotes()
        setBookNotes(notes)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching book notes:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadBookNotes()
  }, [])

  if (loading) return <p className="text-gray-600">Loading...</p>
  if (error) return <p className="text-gray-600">Error: {error}</p>

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
          {bookNotes.map((book) => (
            <TableRow
              key={book.title}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedBook(book)}
            >
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

