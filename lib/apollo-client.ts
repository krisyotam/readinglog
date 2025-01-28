import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

let client: ApolloClient<any> | null = null

export function getClient() {
  if (!client) {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "https://literal.club/graphql/",
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_LITERAL_API_TOKEN}`,
        },
      }),
      cache: new InMemoryCache(),
    })
  }
  return client
}

