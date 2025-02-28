import { NextResponse } from "next/server"

export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json()
    } else {
      // If the response is not JSON, log the text content for debugging
      const text = await response.text()
      console.error("Received non-JSON response:", text)
      throw new Error("Received non-JSON response from server")
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    throw error
  }
}

export function handleApiError(error: unknown) {
  console.error("API error:", error)
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
}

