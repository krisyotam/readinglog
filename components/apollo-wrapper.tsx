"use client"

import type React from "react"

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client"
import { useMemo } from "react"

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    const token = process.env.NEXT_PUBLIC_LITERAL_API_TOKEN || ""

    return new ApolloClient({
      link: new HttpLink({
        uri: "https://literal.club/graphql/",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
      },
    })
  }, [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

