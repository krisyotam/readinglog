import { PageHeader } from "@/components/page-header"
import { CollectionsContent } from "@/components/collections-content"

export default function CollectionsPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader
        title="Collections"
        description="Curated lists of books organized by themes, genres, or personal preferences"
        backLink="/"
      />
      <CollectionsContent />
    </main>
  )
}

