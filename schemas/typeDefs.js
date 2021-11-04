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
    isActive: Boolean!
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

  type Comment {
    id: ID!
    text: String!
    user_id: ID!
    post_id: ID!
    created_at: Date!
  }

  type Message {
    id: ID!
    text: String!
    sender_id: ID!
    receiver_id: ID!
    created_at: Date!
  }

  type Reaction {
    id: ID!
    reaction_type: Reaction_Type!
    post_id: ID
    comment_id: ID
    user_id: ID!
  }

  enum Reaction_Type {
    LIKE
    DISLIKE
  }

  type Hashtag {
    id: ID!
    hashtag_name: String!
    post_id: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    posts: [Post!]
    post(id: ID!): Post!
    followers(id: ID!): [User]
    comments(post_id: ID!): [Comment]
    messages(receiver_id: ID!): [Message]
    reactions(post_id: ID, comment_id: ID): [Reaction]
    postsByHashtag(hashtag_name: String!): [Post!]
  }
`;

module.exports = typeDefs;
