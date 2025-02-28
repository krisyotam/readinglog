import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Book {
  id: string
  title: string
  author: string
  cover: string
}

interface CollectionCardProps {
  id: string
  slug: string
  title: string
  bookCount: number
  books: Book[]
}

export function CollectionCard({ id, slug, title, bookCount, books }: CollectionCardProps) {
  const isLocal = slug.startsWith("local-")
  const href = isLocal ? `/library/collections/${slug}` : `/collections/${slug}`

  return (
    <Link href={href} passHref>
      <Card className="group relative cursor-pointer p-6 transition-colors hover:bg-accent dark:hover:bg-accent/50 h-[300px]">
        <CardContent className="flex flex-col items-center space-y-2 p-0">
          <h3 className="text-lg font-medium h-14 overflow-hidden">{title}</h3>
          <p className="text-sm text-muted-foreground h-6">{bookCount} books</p>
          <div className="relative h-48 w-full">
            {books.slice(0, 3).map((book, index) => (
              <div
                key={book.id}
                className="absolute h-[140px] w-[100px] transition-transform duration-200 ease-out group-hover:translate-y-[-8px]"
                style={{
                  left: "50%",
                  transform: `
                    translateX(calc(-50% + ${index * 15}px))
                    rotate(${(index - 1) * 5}deg)
                  `,
                  zIndex: index,
                }}
              >
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title || "Book cover"}
                  fill
                  className="rounded-sm object-cover shadow-md"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

