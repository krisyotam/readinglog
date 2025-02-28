import { PageHeader } from "@/components/page-header"
import { CollectionContent } from "@/components/collection-content"

export default function CollectionPage({ params }: { params: { slug: string } }) {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Collection" backLink="/collections" />
      <CollectionContent slug={params.slug} />
    </main>
  )
}

