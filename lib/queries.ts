import { gql } from "@apollo/client"

export const GET_READING_STATES = gql`
  query myReadingStates {
    myReadingStates {
      id
      status
      book {
        id
        slug
        title
        subtitle
        authors {
          name
        }
        cover
      }
    }
  }
`

export const GET_SHELVES = gql`
  query getShelvesByProfileId($profileId: String!, $limit: Int!, $offset: Int!) {
    getShelvesByProfileId(profileId: $profileId, limit: $limit, offset: $offset) {
      id
      slug
      title
      description
      books(take: 3) {
        id
        cover
        title
      }
    }
  }
`

export const GET_MOMENTS = gql`
  query momentsByHandleAndBookId($bookId: String!, $handle: String) {
    momentsByHandleAndBookId(bookId: $bookId, handle: $handle) {
      id
      note
      quote
      spoiler
      createdAt
      profile {
        id
        handle
        name
      }
    }
  }
`

