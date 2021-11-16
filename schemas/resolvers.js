const {
  User,
  Post,
  Follow,
  Comment,
  Message,
  Reaction,
  Hashtag,
  Crypto,
  FriendRequest,
} = require('../models');

const resolvers = {
  Query: {
    // USER RESOLVERS
    userProfile: async (parent, { id }) => {
      const user = await User.findOne({
        where: { id },
      });
      return user;
    },
    // POST RESOLVERS
    posts: async (parent, { user_id }) => {
      return await Post.findAll({
        where: { user_id },
      });
    },
    //FOLLOWERS
    followers: async (parent, { id }) => {
      const followers = await Follow.findAll({
        where: { followed_user_id: id },
      });
      let followersList = [];
      for (let i = 0; i < followers.length; i++) {
        const follower = await User.findOne({
          where: { id: followers[i].follower_user_id },
        });
        if (follower) {
          followersList.push(follower);
        }
      }
      return followersList;
    },
    //COMMENTS
    comments: async (parent, { post_id }) => {
      const comments = await Comment.findAll({
        where: { post_id },
      });
      return comments;
    },
    //MESSAGES
    messages: async (parent, { receiver_id }) => {
      const messages = await Message.findAll({
        where: { receiver_id },
      });
      return messages;
    },
    //REACTIONS
    reactions: async (parent, { post_id, comment_id }) => {
      if (post_id) {
        const reactions = await Reaction.findAll({
          where: { post_id },
        });
        return reactions;
      } else if (comment_id) {
        const reactions = await Reaction.findAll({
          where: { comment_id },
        });
        return reactions;
      }
    },
    //HASHTAGS
    postsByHashtag: async (parent, { hashtag_name }) => {
      const postIds = await Hashtag.findAll({
        where: { hashtag_name },
      });
      let posts = [];
      for (let i = 0; i < postIds.length; i++) {
        const post = await Post.findOne({
          where: { id: postIds[i].post_id },
        });
        if (post) {
          posts.push(post);
        }
      }
      return posts;
    },
    //CRYPTO
    cryptoByUserId: async (parent, { user_id }) => {
      const cryptos = await Crypto.findAll({
        where: { user_id },
      });
      return cryptos;
    },
    //FIND SINGLE FRIEND REQUEST
    friendRequest: async (parent, { receiver_id, sender_id }) => {
      const friendRequest = await FriendRequest.findOne({
        where: { receiver_id, sender_id },
      });
      return friendRequest;
    },
    //FRIEND REQUEST PENDING LIST
    friendRequests: async (parent, { id }) => {
      const senderIds = await FriendRequest.findAll({
        where: { receiver_id: id, status: 'PENDING' },
      });
      let friendRequests = [];
      for (let i = 0; i < senderIds.length; i++) {
        const friendRequest = await User.findOne({
          where: { id: senderIds[i].sender_id },
        });
        if (friendRequest) {
          friendRequests.push(friendRequest);
        }
      }
      return friendRequests;
    },
    //GET FRIENDS LIST
    friendsList: async (parent, { id }) => {
      const friendsIds = await FriendRequest.findAll({
        where: { receiver_id: id, status: 'CONFIRM' },
      });
      let friendsList = [];
      for (let i = 0; i < friendsIds.length; i++) {
        const friend = await User.findOne({
          where: { id: friendsIds[i].sender_id },
        });
        if (friend) {
          friendsList.push(friend);
        }
      }
      return friendsList;
    },
    //BLOCKED FRIENDS LIST
    blockedFriendsList: async (parent, { id }) => {
      const blockedFriendsIds = await FriendRequest.findAll({
        where: { receiver_id: id, status: 'BLOCKED' },
      });
      let blockedFriendsList = [];
      for (let i = 0; i < blockedFriendsIds.length; i++) {
        const blockedFriend = await User.findOne({
          where: { id: blockedFriendsIds[i].sender_id },
        });
        if (blockedFriend) {
          blockedFriendsList.push(blockedFriend);
        }
      }
      return blockedFriendsList;
    },
  },
  Mutation: {
    addUserProfile: async (parent, { id, email, handle }) => {
      const user = await User.create({
        id,
        email,
        handle,
      });
      return user;
    },
    updateUserProfile: async (
      parent,
      {
        id,
        email,
        handle,
        avatar,
        gender,
        birth_date,
        bio,
        city,
        state,
        country,
        status,
        isActive,
        created_at,
        updated_at,
      }
    ) => {
      const user = await User.findOneAndUpdate(
        { id },
        {
          id,
          email,
          handle,
          avatar,
          gender,
          birth_date,
          bio,
          city,
          state,
          country,
          status,
          isActive,
          created_at,
          updated_at,
        }
      );
      return user;
    },
    addPost: async (parent, { user_id, text }) => {
      const user = await Post.create({
        user_id,
        text,
      });
      return user;
    },
    followRequest: async (parent, { sender_id, receiver_id }) => {
      const findRequest = await FriendRequest.findOne({
        where: {
          sender_id,
          receiver_id,
        },
      });
      if (!findRequest) {
        const request = await FriendRequest.create({
          sender_id,
          receiver_id,
        });
        return request;
      } else if (findRequest) {
        throw new Error('Friend Request already exists.');
      }
    },
    respondFollowRequest: async (
      parent,
      { id, status, sender_id, receiver_id }
    ) => {
      const response = await FriendRequest.update(
        { id, status, sender_id, receiver_id },
        {
          where: { id },
        }
      );
      return response;
    },
    deletePost: async (parent, { id }) => {
      try {
        await Post.destroy({
          where: { id },
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
};

module.exports = resolvers;
