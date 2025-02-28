"use client"

import { useQuery } from "@apollo/client"
import { GET_SHELVES } from "@/lib/queries"
import { CollectionCard } from "./collection-card"

export function CollectionsContent() {
  const { data, loading, error } = useQuery(GET_SHELVES, {
    variables: {
      profileId: "cm5fov0gb11776030hygk2lu0mzg",
      limit: 20,
      offset: 0,
    },
  })

  if (loading) return <p className="text-gray-600 dark:text-gray-400">Loading collections...</p>
  if (error) return <p className="text-red-600 dark:text-red-400">Error loading collections: {error.message}</p>

  const collections = data?.getShelvesByProfileId || []

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          id={collection.id}
          slug={collection.slug}
          title={collection.title}
          bookCount={collection.books.length}
          books={collection.books}
        />
      ))}
    </div>
  )
}

