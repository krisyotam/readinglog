import { ApolloWrapper } from "@/components/apollo-wrapper"
import { PageHeader } from "@/components/page-header"
import { CollectionsContent } from "./collections-content"

export default function CollectionsPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Collections" />
      <ApolloWrapper>
        <CollectionsContent />
      </ApolloWrapper>
    </main>
  )
}