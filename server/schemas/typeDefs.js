const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me(username: String, id: ID): User
  }
  input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    signup(email: String!, username: String!, password: String!): Auth
    saveBook(authors: [String], bookId: ID!, image: String!, title: String!, description: String): User
    deleteBook(bookId: ID!): User
  }
`;
