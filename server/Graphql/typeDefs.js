const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    password_confirmation: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    registerUser(input: RegisterInput): User!
  }
`;

module.exports = typeDefs;
