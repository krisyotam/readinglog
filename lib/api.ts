import type { Book } from "@/types/book"

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("/api/books")
  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }
  return response.json()
}

