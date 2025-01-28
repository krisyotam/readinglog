import { format, parseISO } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"

interface LogEntry {
  id: number
  bookTitle: string
  pagesRead: number
  description: string
  date: string
  timeRead: string
}

interface ReadingLogProps {
  entries: LogEntry[]
}

export function ReadingLog({ entries }: ReadingLogProps) {
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="space-y-6">
      {sortedEntries.map((entry) => (
        <Card key={entry.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{entry.bookTitle}</h3>
              <div className="text-sm text-gray-500">{format(parseISO(entry.date), "MMM d, yyyy")}</div>
            </div>
            <p className="text-gray-600 mb-4">{entry.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Pages read: {entry.pagesRead}</span>
              <span>Time read: {entry.timeRead}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

