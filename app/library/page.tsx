import { PageHeader } from "@/components/page-header"
import { LibrarySection } from "@/components/library-section"

export default function LibraryPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Library" />
      <div className="prose prose-gray max-w-none">
        <LibrarySection />
      </div>
    </main>
  )
}

