"use client"

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client"
import { useMemo } from "react"

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri: "https://literal.club/graphql/",
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_LITERAL_API_TOKEN}`,
        },
      }),
      cache: new InMemoryCache(),
    })
  }, [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

