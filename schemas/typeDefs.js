const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    handle: String!
    avatar: String
    gender: Gender
    birth_date: Date
    bio: String
    city: String
    state: String
    country: String
    status: MoodStatus
    isActive: Boolean!
    created_at: Date!
    updated_at: Date!
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }
  enum MoodStatus {
    HAPPY
    SAD
    EXCITED
    AMUSED
    OPTIMISTIC
    FRUSTRATED
  }

  type Post {
    id: ID!
    text: String!
    user_id: ID!
    created_at: Date!
  }

  type Follow {
    id: ID!
    follower_user_id: String!
    followed_user_id: String!
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
    isSeen: Boolean!
    sender_id: ID!
    receiver_id: ID!
    sent_at: Date!
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

  type Crypto {
    id: ID!
    crypto_name: String!
    holding_amount: Int!
    purchase_date: Date
    user_id: ID!
  }

  type FriendRequest {
    id: ID!
    sender_id: String!
    receiver_id: String!
    status: Status!
  }

  type CryptoAPI {
    name: String
    current_price: String
    image: String
  }

  enum Status {
    PENDING
    CONFIRMED
    BLOCKED
    REJECTED
  }

  enum Verify {
    YAY
    NAY
  }

  type Query {
    userProfile(id: ID!): User
    usersList(handle: String!): [User]
    allUsers(id: ID!): [User]
    whoToFollowUsers(id: ID!): [User]
    posts(user_id: ID!): [Post]
    postsByFollowing(user_id: ID!): [Post]
    followers(id: ID!): [User]
    followings(id: ID!): [User]
    checkFriendship(follower: String!, followed: String!): Boolean
    comments(post_id: ID!): [Comment]
    messengers(id: ID!): [User]
    messages(sender_id: String!, receiver_id: String!): [Message]
    reactionsByUserAndPost(post_id: ID!, user_id: ID!): Reaction
    reactionsByUserAndComment(comment_id: ID!, user_id: ID!): Reaction
    reactionsByPost(reaction_type: String!, post_id: ID!): [Reaction]
    reactionsByComment(reaction_type: String!, comment_id: ID!): [Reaction]
    postsByHashtag(hashtag_name: String!): [Post!]
    cryptoByUserId(user_id: ID!): [Crypto!]
    friendRequest(receiver_id: String!, sender_id: String!): FriendRequest
    friendRequests(id: ID!): [User!]
    friendsList(id: ID!): [User!]
    blockedFriendsList(id: ID!): [User!]
    twitterSearch(keyword: String!):[String]
    cryptoSearchAPI(name: String!): CryptoAPI
  }
  type Mutation {
    addUserProfile(id: ID!, email: String!, handle: String!): User!
    updateUserProfile(
      id: ID!
      email: String!
      handle: String!
      avatar: String
      gender: Gender
      birth_date: Date
      bio: String
      city: String
      state: String
      country: String
      status: MoodStatus
      isActive: Boolean!
    ): User!
    addPost(text: String!, user_id: ID!): Post!
    followRequest(sender_id: String!, receiver_id: String!): FriendRequest!
    respondFollowRequest(
      sender_id: String!
      receiver_id: String!
      status: Status!
    ): FriendRequest!
    removeFollower(follower_user_id: String!, followed_user_id: String!):Follow
    removeFollowing(follower_user_id: String!, followed_user_id: String!):Follow
    deletePost(id: ID!): Post
    addComment(text: String!, user_id: ID!, post_id: ID!): Comment!
    deleteComment(id: ID!): Comment
    addCrypto(crypto_name: String!, holding_amount: Int!, user_id: ID!): Crypto
    updateCrypto(id: ID! holding_amount: Int!): Crypto
    deleteCrypto(id: ID!): Crypto
    addMessage(text: String!, sender_id: String!, receiver_id: String!): Message
    deleteMessage(id: ID!): Message
    addReactionOnPost(reaction_type: String!, user_id: ID!, post_id: ID!): Reaction
    addReactionOnComment(reaction_type: String!, user_id: ID!, comment_id: ID!): Reaction
    deleteReactionOnPost(user_id: ID!, post_id: ID!): Reaction
    deleteReactionOnComment(user_id: ID!, comment_id: ID!): Reaction
  }
`;

module.exports = typeDefs;
