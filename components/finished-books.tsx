interface Book {
  id: string
  slug: string
  title: string
}

interface FinishedBooksProps {
  books: Book[]
}

export function FinishedBooks({ books }: FinishedBooksProps) {
  return (
    <div className="space-y-6">
      {books.map((book) => (
        <div key={book.id} className="flex justify-between items-baseline">
          <div className="text-gray-800 hover:text-gray-600 cursor-default">{book.title}</div>
          <span className="text-gray-500 text-sm">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      ))}
    </div>
  )
}

