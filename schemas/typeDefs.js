const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    handle: String!
    avatar: String!
    gender: Gender!
    birth_date: DateTime!
    bio: String!
    city: String!
    state: String!
    country: String!
    status: Status!
    following_count: Int!
    followers_count: Int!
    created_at: DateTime! @default(expr: $now)
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
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
