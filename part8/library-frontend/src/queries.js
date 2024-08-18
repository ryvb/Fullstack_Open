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
  query getBooks($genres: [String]) {
    allBooks(
      genres: $genres
    ) {
        title
        author {
          name
          born
          bookCount
        }
        published
        genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
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
      author {
        name
        born
        bookCount 
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }  
`

export const RECC_BOOKS = gql`
  query {
    reccBooks {
      title
      author {
        name
        born
      }
      published 
    }
  }
`

export const FAV_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`