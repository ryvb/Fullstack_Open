import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
        name
        born
        bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        author
        published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $intPublished: Int!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $intPublished,
      genres: $genres
    ) {
      title
      author
      published
      genres
      } 
  }
`

export const CHANGE_AUTHOR = gql`
  mutation changeAuthor($name: String!, $intBorn: Int!) {
    editAuthor (
      name: $name,
      born: $intBorn
    ) {
      name
      born
      }
  }
`
