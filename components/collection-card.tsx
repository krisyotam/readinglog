import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface CollectionCardProps {
  id: string
  slug: string
  title: string
  bookCount: number
  books: Array<{ id: string; cover: string; title: string }>
}

export function CollectionCard({ id, slug, title, bookCount, books = [] }: CollectionCardProps) {
  return (
    <Link href={`/collections/${slug}`} passHref>
      <Card className="group relative cursor-pointer p-6 transition-colors hover:bg-accent">
        <CardContent className="flex flex-col items-center space-y-2 p-0">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{bookCount} books</p>
          <div className="relative h-32 w-full">
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
                  alt={book.title}
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

