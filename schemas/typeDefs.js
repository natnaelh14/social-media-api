const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    handle: String!
    image_url: String!
    bio: String!
    city: String!
    state: String!
    country: String!
    status: Status!
  }
  enum Status {
    Happy
    Sad
    Excited
    Amused
    Optimistic
    Frustrated
  }
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;

module.exports = typeDefs;
