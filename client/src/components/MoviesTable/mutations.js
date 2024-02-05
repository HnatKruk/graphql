import { gql } from '@apollo/client'

export const markMovieViewingMutation = gql`
  mutation markMovieViewingMutation($id: ID!, $watched: Boolean!) {
    markMovieViewing(id: $id, watched: $watched) {
      name
    }
  }
`