import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  backLink?: string
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backLink && (
        <Link
          href={backLink}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
      )}
      <h1 className="text-2xl font-medium">{title}</h1>
      {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
      <div className="h-px bg-gray-200 dark:bg-gray-700 mt-4"></div>
    </div>
  )
}

