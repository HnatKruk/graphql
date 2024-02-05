import { gql } from '@apollo/client'

export const addMovieMutation = gql`
  mutation addMovieMutation($name: String!, $genre: String!, $directorId: ID, $rate: Float, $watched: Boolean!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId, rate: $rate, watched: $watched) {
      name
    }
  }
`

export const updateMovieMutation = gql`
  mutation updateMovieMutation($id: ID! $name: String!, $genre: String!, $directorId: ID, $rate: Float, $watched: Boolean!) {
    updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId, rate: $rate, watched: $watched) {
      name
    }
  }
`