import Image from "next/image"
import Link from "next/link"
import { GET_READING_STATES } from "@/lib/queries"
import { getClient } from "@/lib/apollo-client"
import type { Book, ReadingState } from "@/types/book"
import dynamic from "next/dynamic"

const BookClub = dynamic(() => import("@/components/book-club"), { ssr: false })
const CurrentFavorite = dynamic(() => import("@/components/current-favorite"), { ssr: false })
const FinishedBooks = dynamic(() => import("@/components/finished-books"), { ssr: false })

export default async function Home() {
  const client = getClient()
  const { data, error } = await client.query<{ myReadingStates: ReadingState[] }>({ query: GET_READING_STATES })

  if (error) {
    console.error("Error fetching reading states:", error)
  }

  const finished: Book[] = (data?.myReadingStates || [])
    .filter((state): state is ReadingState => state?.status === "FINISHED" && !!state.book)
    .map((state) => state.book)

  return (
    <main className="max-w-[650px] mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="w-[100px] h-[100px] relative mb-6 group">
          <Image
            src="/krisnow.jpg"
            alt="Profile"
            fill
            className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          I'm Kris, Maths student and book enthusiast. Currently tracking through{" "}
          <Link href="https://literal.club" className="underline hover:text-gray-800">
            Literal
          </Link>
          .
        </p>
        <nav className="space-y-2">
          <div>
            <Link href="/activity" className="text-gray-600 hover:text-gray-800">
              Activity
            </Link>
          </div>
          <div>
            <Link href="/collections" className="text-gray-600 hover:text-gray-800">
              Collections
            </Link>
          </div>
          <div>
            <Link href="/notes" className="text-gray-600 hover:text-gray-800">
              Notes
            </Link>
          </div>
          <div>
            <Link href="/library" className="text-gray-600 hover:text-gray-800">
              Library
            </Link>
          </div>
          <div>
            <Link href="/library/log" className="text-gray-600 hover:text-gray-800">
              Log
            </Link>
          </div>
        </nav>
      </div>

      <div className="space-y-12">
        <BookClub />
        <CurrentFavorite />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-medium mb-4">Recently Read</h2>
        <div className="h-px bg-gray-200 mb-6"></div>
        <FinishedBooks books={finished} />
      </section>
    </main>
  )
}

