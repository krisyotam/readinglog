import { ApolloClient, InMemoryCache, HttpLink, type NormalizedCacheObject } from "@apollo/client"

let client: ApolloClient<NormalizedCacheObject> | null = null

export function getClient() {
  if (!client || typeof window === "undefined") {
    const token = process.env.NEXT_PUBLIC_LITERAL_API_TOKEN

    if (!token) {
      console.warn("NEXT_PUBLIC_LITERAL_API_TOKEN is not set")
    }

    client = new ApolloClient({
      link: new HttpLink({
        uri: "https://literal.club/graphql/",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      }),
      cache: new InMemoryCache(),
      ssrMode: typeof window === "undefined",
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
      },
    })
  }
  return client
}

