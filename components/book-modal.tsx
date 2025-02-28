import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookCard } from "@/components/book-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  books: any[] | null
}

export function BookModal({ isOpen, onClose, title, books }: BookModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {books && books.length > 0 ? (
              books.map((state) => (
                <BookCard
                  key={state?.book?.id || Math.random().toString()}
                  coverUrl={state?.book?.cover || ""}
                  title={state?.book?.title || "Unknown Title"}
                  subtitle={state?.book?.subtitle}
                  author={state?.book?.authors?.map((a) => a.name).join(", ") || "Unknown Author"}
                  rating={0}
                />
              ))
            ) : (
              <p>No books to display</p>
            )}
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

