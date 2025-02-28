import { fetchData } from "./fetchData"

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

export async function fetchBookNotes(): Promise<BookNote[]> {
  try {
    const data = await fetchData<{ bookNotes: BookNote[] }>("/api/book-notes")
    return data.bookNotes
  } catch (error) {
    console.error("Error fetching book notes:", error)
    throw new Error("Failed to fetch book notes")
  }
}

