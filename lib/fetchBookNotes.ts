import bookNotesData from "@/data/book-notes.json"

export function fetchBookNotes() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bookNotesData && bookNotesData.bookNotes) {
        resolve(bookNotesData.bookNotes)
      } else {
        reject(new Error("Failed to fetch book notes"))
      }
    }, 500) // Simulating a small delay
  })
}

