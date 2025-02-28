import type { Book } from "@/types/book"

interface BookListProps {
  books: Book[]
}

export function BookList({ books }: BookListProps) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <h3>{book.title}</h3>
          <p>By: {book.authors.map((author) => author.name).join(", ")}</p>
          {book.publishedDate && <p>Published: {new Date(book.publishedDate).getFullYear()}</p>}
          {book.pageCount && <p>Pages: {book.pageCount}</p>}
          {book.categories.length > 0 && <p>Categories: {book.categories.join(", ")}</p>}
          {book.imageLinks?.thumbnail && (
            <img src={book.imageLinks.thumbnail || "/placeholder.svg"} alt={`Cover of ${book.title}`} />
          )}
        </li>
      ))}
    </ul>
  )
}

