import { PageHeader } from "@/components/page-header"
import { LocalCollectionContent } from "@/components/local-collection-content"

export default function LocalCollectionPage({ params }: { params: { slug: string } }) {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader backLink="/library" />
      <LocalCollectionContent slug={params.slug} />
    </main>
  )
}

