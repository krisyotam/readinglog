import { PageHeader } from "@/components/page-header"
import { ReadingLog } from "@/components/reading-log"
import readingLogData from "@/data/reading-log.json"

export default function LogPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Reading Log" />
      <ReadingLog entries={readingLogData.entries} />
    </main>
  )
}

