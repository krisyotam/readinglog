import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { handleApiError } from "@/lib/fetchData"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "book-notes.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error)
  }
}

