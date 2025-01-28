"use client"

import { useState } from "react"
import { useQuery } from "@apollo/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { BookCard } from "@/components/book-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GET_READING_STATES, GET_SHELVES } from "@/lib/queries"
import { BookModal } from "@/components/book-modal"
import { CollectionCard } from "./collection-card"
import { NotesSection } from "./notes-section"
import { LibrarySection } from "./library-section"

interface LibraryContentProps {
  defaultTab?: "activity" | "collections" | "notes" | "library"
}

export function LibraryContent({ defaultTab = "activity" }: LibraryContentProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", books: [] })

  const {
    data: readingStatesData,
    loading: readingStatesLoading,
    error: readingStatesError,
  } = useQuery(GET_READING_STATES)
  const {
    data: shelvesData,
    loading: shelvesLoading,
    error: shelvesError,
  } = useQuery(GET_SHELVES, {
    variables: {
      profileId: "cm5fov0gb11776030hygk2lu0mzg",
      limit: 20,
      offset: 0,
    },
  })

  if (readingStatesLoading || shelvesLoading) return <p>Loading...</p>
  if (readingStatesError) return <p>Error: {readingStatesError.message}</p>
  if (shelvesError) return <p>Error: {shelvesError.message}</p>

  const readingStates = readingStatesData?.myReadingStates || []
  const wantsToRead = readingStates.filter((state) => state.status === "WANTS_TO_READ")
  const isReading = readingStates.filter((state) => state.status === "IS_READING")
  const finished = readingStates.filter((state) => state.status === "FINISHED")

  const collections = shelvesData?.getShelvesByProfileId || []

  const openModal = (title, books) => {
    setModalContent({ title, books })
    setModalOpen(true)
  }

  return (
    <>
      {/* Profile Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Kris Yotam</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>@krisyotam</span>
            <span className="text-xs">·</span>
            <span>Following 1</span>
            <span className="text-xs">·</span>
            <span>32,873 followers</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Avatar className="h-14 w-14">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home-Marc-Astbury-01-22-2025_04_16_AM-JPqPCf3TLevQ4hkPfVex2vBbrfwzmR.png"
              alt="Profile"
            />
            <AvatarFallback>KY</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue={defaultTab} className="space-y-8">
        <TabsList className="border-b w-full rounded-none h-auto p-0 bg-transparent flex justify-start">
          <TabsTrigger
            value="activity"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="collections"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Collections <span className="ml-1 text-gray-400">{collections.length}</span>
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-800 data-[state=active]:bg-transparent px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-12">
          <ActivityContent isReading={isReading} wantsToRead={wantsToRead} finished={finished} openModal={openModal} />
        </TabsContent>

        <TabsContent value="collections" className="space-y-12">
          <CollectionsContent collections={collections} />
        </TabsContent>

        <TabsContent value="notes" className="space-y-12">
          <NotesSection />
        </TabsContent>

        <TabsContent value="library" className="space-y-12">
          <LibrarySection />
        </TabsContent>
      </Tabs>

      <BookModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        books={modalContent.books}
      />
    </>
  )
}

function ActivityContent({ isReading, wantsToRead, finished, openModal }) {
  return (
    <>
      {/* Read Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Read{" "}
            <span className="text-gray-500 font-normal">
              · {isReading.length} book{isReading.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <Button
            variant="link"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => openModal("Read", isReading)}
          >
            See more →
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {isReading.slice(0, 6).map((state) => (
            <BookCard
              key={state.book.id}
              coverUrl={state.book.cover}
              title={state.book.title}
              subtitle={state.book.subtitle}
              author={state.book.authors.map((a) => a.name).join(", ")}
              rating={0}
            />
          ))}
        </div>
      </section>

      {/* To Read Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            To Read{" "}
            <span className="text-gray-500 font-normal">
              · {wantsToRead.length} book{wantsToRead.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <Button
            variant="link"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => openModal("To Read", wantsToRead)}
          >
            See more →
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {wantsToRead.slice(0, 6).map((state) => (
            <BookCard
              key={state.book.id}
              coverUrl={state.book.cover}
              title={state.book.title}
              subtitle={state.book.subtitle}
              author={state.book.authors.map((a) => a.name).join(", ")}
              rating={0}
            />
          ))}
        </div>
      </section>

      {/* Finished Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Finished{" "}
            <span className="text-gray-500 font-normal">
              · {finished.length} book{finished.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <Button
            variant="link"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => openModal("Finished", finished)}
          >
            See more →
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {finished.slice(0, 6).map((state) => (
            <BookCard
              key={state.book.id}
              coverUrl={state.book.cover}
              title={state.book.title}
              subtitle={state.book.subtitle}
              author={state.book.authors.map((a) => a.name).join(", ")}
              rating={0}
            />
          ))}
        </div>
      </section>
    </>
  )
}

function CollectionsContent({ collections }) {
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

