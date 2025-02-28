import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ApolloWrapper } from "@/components/apollo-wrapper"
import ErrorBoundary from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Reading Tracker",
  description: "Track your reading progress and manage your book collection",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ApolloWrapper>
              <div className="flex justify-end p-4">
                <DarkModeToggle />
              </div>
              {children}
            </ApolloWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'