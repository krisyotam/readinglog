import { PageHeader } from "@/components/page-header"
import { NotesSection } from "@/components/notes-section"

export default function NotesPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Notes" />
      <div className="prose prose-gray max-w-none">
        <NotesSection />
      </div>
    </main>
  )
}

