import { PageHeader } from "@/components/page-header"
import { LibraryTabs } from "@/components/library-tabs"

export default function LibraryPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader
        title="Library"
        description="Your complete book collection, personal notes, and curated sets"
        backLink="/"
      />
      <LibraryTabs />
    </main>
  )
}

