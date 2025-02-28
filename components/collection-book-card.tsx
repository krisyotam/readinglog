import { Card } from "@/components/ui/card"
import Image from "next/image"

interface CollectionBookCardProps {
  coverUrl: string
  title: string
  author: string
}

export function CollectionBookCard({ coverUrl, title, author }: CollectionBookCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:bg-accent">
      <div className="p-6 space-y-4">
        <div className="relative aspect-[3/4] w-full bg-muted">
          <Image
            src={coverUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">by {author}</p>
        </div>
      </div>
    </Card>
  )
}

