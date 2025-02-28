export interface Author {
  id: string
  name: string
}

export interface Book {
  id: string
  slug: string
  title: string
  subtitle?: string
  authors: Author[]
  cover: string
}

export interface ReadingState {
  id: string
  status: "IS_READING" | "FINISHED" | "WANTS_TO_READ"
  book: Book
}

