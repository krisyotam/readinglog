import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </Link>
      <h1 className="text-2xl font-medium">{title}</h1>
      <div className="h-px bg-gray-200 mt-4"></div>
    </div>
  )
}

