import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($title: String!, $description: String, $image: String!, $authors: [String], $bookId: ID!) {
    saveBook(title: $title, description: $description, image: $image, authors: $authors, bookId: $bookId) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        title
        description
        image
        authors
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      username
      bookCount
      savedBooks {
        bookId
      }
    }
  }
`;
