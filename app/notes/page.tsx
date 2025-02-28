import { PageHeader } from "@/components/page-header"
import { NotesSection } from "@/components/notes-section"

export default function NotesPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader
        title="Notes"
        description="Your personal insights, reflections, and key takeaways from books"
        backLink="/"
      />
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <NotesSection />
      </div>
    </main>
  )
}

