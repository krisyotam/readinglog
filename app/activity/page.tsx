import { PageHeader } from "@/components/page-header"
import { ActivityContent } from "@/components/activity-content"

export default function ActivityPage() {
  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <PageHeader title="Activity" description="Your recent reading activity and book interactions" backLink="/" />
      <ActivityContent />
    </main>
  )
}

