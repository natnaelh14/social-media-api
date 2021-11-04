const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    handle: String!
    avatar: String!
    gender: Gender!
    birth_date: Date!
    bio: String!
    city: String!
    state: String!
    country: String!
    status: Status!
    following_count: Int!
    followers_count: Int!
    created_at: Date!
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

  type Post {
    id: ID!
    text: String!
    user_id: ID!
    created_at: Date!
  }

  type Follow {
    id: ID!
    follower_user_id: ID!
    followed_user_id: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    followers(followed_user_id: ID!): [Follow]
  }
`;

module.exports = typeDefs;
