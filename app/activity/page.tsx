import { ApolloWrapper } from "@/components/apollo-wrapper"
import { PageHeader } from "@/components/page-header"
import { ActivityContent } from "@/components/activity-content"

export default function ActivityPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Activity" />
      <ApolloWrapper>
        <ActivityContent />
      </ApolloWrapper>
    </main>
  )
}

