import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface BookNoteModalProps {
  book: {
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
  isOpen: boolean
  onClose: () => void
}

export function BookNoteModal({ book, isOpen, onClose }: BookNoteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <div className="flex items-start space-x-4">
            <div className="relative h-[150px] w-[100px]">
              <Image
                src={book.coverImage || "/placeholder.svg"}
                alt={`${book.title} cover`}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
              <p className="text-sm text-muted-foreground">Year: {book.year}</p>
              <a
                href={book.goodreadsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                View on Goodreads
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-md">
              <h4 className="font-semibold mb-1 text-sm">Grammar: Key Concepts</h4>
              <p className="text-xs mb-1">{book.grammar.part1}</p>
              <p className="text-xs">{book.grammar.part2}</p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <h4 className="font-semibold mb-1 text-sm">Logic: Key Themes</h4>
              <p className="text-xs">{book.logic}</p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <h4 className="font-semibold mb-1 text-sm">Rhetoric: Analysis and Opinion</h4>
              <p className="text-xs">{book.rhetoric}</p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <h4 className="font-semibold mb-1 text-sm">Book Review: Personal Reflections</h4>
              <p className="text-xs">{book.review}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

