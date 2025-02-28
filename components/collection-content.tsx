"use client"

import { useQuery, gql } from "@apollo/client"
import { BookCard } from "./book-card"

const GET_COLLECTION = gql`
  query GetCollection($slug: String!) {
    getShelfBySlug(slug: $slug) {
      id
      title
      description
      books {
        id
        title
        subtitle
        cover
        authors {
          name
        }
      }
    }
  }
`

interface CollectionContentProps {
  slug: string
}

export function CollectionContent({ slug }: CollectionContentProps) {
  const { data, loading, error } = useQuery(GET_COLLECTION, {
    variables: { slug },
  })

  if (loading) return <p className="text-gray-600">Loading collection...</p>
  if (error) return <p className="text-gray-600">Error loading collection: {error.message}</p>

  const collection = data?.getShelfBySlug

  if (!collection) return <p className="text-gray-600">Collection not found.</p>

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{collection.title}</h2>
        {collection.description && <p className="text-gray-600">{collection.description}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collection.books.map((book) => (
          <BookCard
            key={book.id}
            coverUrl={book.cover}
            title={book.title}
            subtitle={book.subtitle}
            author={book.authors.map((a) => a.name).join(", ")}
            rating={0}
          />
        ))}
      </div>
    </div>
  )
}

