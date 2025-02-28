import { PageHeader } from "@/components/page-header"
import { ReadingLog } from "@/components/reading-log"
import { fetchData } from "@/lib/fetchData"

interface ReadingLogEntry {
  id: number
  bookTitle: string
  pagesRead: number
  description: string
  date: string
  timeRead: string
}

async function getReadingLogData(): Promise<{ entries: ReadingLogEntry[] }> {
  return fetchData<{ entries: ReadingLogEntry[] }>("/api/reading-log")
}

export default async function LogPage() {
  try {
    const readingLogData = await getReadingLogData()
    return (
      <main className="max-w-[650px] mx-auto px-4 py-12">
        <PageHeader title="Reading Log" description="Track your reading progress and habits over time" backLink="/" />
        <ReadingLog entries={readingLogData.entries} />
      </main>
    )
  } catch (error) {
    return (
      <main className="max-w-[650px] mx-auto px-4 py-12">
        <PageHeader title="Reading Log" description="Track your reading progress and habits over time" backLink="/" />
        <p className="text-red-600 dark:text-red-400">Failed to load reading log. Please try again later.</p>
      </main>
    )
  }
}

