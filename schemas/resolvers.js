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
const Twitter = require('twitter');
const needle = require('needle');
const fetch = require('cross-fetch');
require('dotenv').config();

const resolvers = {
  Query: {
    // USER RESOLVERS
    userProfile: async (parent, { id }) => {
      const user = await User.findOne({
        where: { id },
      });
      return user;
    },
    usersList: async (parent, { handle }) => {
      const users = await User.findAll({}).then((res) =>
        res.filter((user) =>
          user.handle.toLowerCase().includes(handle.toLowerCase().trim())
        )
      );
      return users;
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
    //FOLLOWING
    followings: async (parent, { id }) => {
      const followings = await Follow.findAll({
        where: { follower_user_id: id },
      });
      let followingsList = [];
      for (let i = 0; i < followings.length; i++) {
        const follow = await User.findOne({
          where: { id: followings[i].followed_user_id },
        });
        if (follow) {
          followingsList.push(follow);
        }
      }
      return followingsList;
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
    twitterSearch: async (parent, { keyword }) => {
      const token = process.env.BEARER_TOKEN;
      const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';

      const params = {
        query: keyword,
        'tweet.fields': 'author_id',
      };
      const res = await needle('get', endpointUrl, params, {
        headers: {
          'User-Agent': 'NatnaelH',
          authorization: `Bearer ${token}`,
        },
      });
      if (res.body) {
        return res.body.data.map((tweet) => tweet.text);
      } else {
        throw new Error('Unsuccessful request');
      }
    },
    cryptoSearchAPI: async (parent, { name }) => {
      const cryptoResult = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return {
            name: res[0].name,
            current_price: res[0].current_price,
            image: res[0].image,
          };
        });
      return cryptoResult;
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
      }
    ) => {
      const userData = await User.findOne({ id });
      return await userData.update({
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
      });
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
      { status, sender_id, receiver_id }
    ) => {
      try {
        const searchRequest = await FriendRequest.findOne({
          where: { sender_id, receiver_id },
        });
        if (searchRequest) {
          if (status === 'CONFIRMED') {
            await Follow.create({
              follower_user_id: sender_id,
              followed_user_id: receiver_id,
            });
            const response = await searchRequest.update({
              ...searchRequest,
              status,
            });
            return response;
          } else if(status === 'REJECTED') {
             return await searchRequest.destroy({});
          } else {
            const response = await searchRequest.update({
              ...searchRequest,
              status,
            });
            return response;
          }
        } else {
          throw new Error ('Unable to find Friend Request')
        }
      } catch (e) {
        throw new Error ('Unable to update Friend Request')
      }
    },
    deletePost: async (parent, { id }) => {
      try {
        await Post.destroy({
          where: { id },
        });
      } catch (e) {
        throw new Error('Unable to delete post');
      }
    },
    addComment: async (parent, { user_id, post_id, text }) => {
      return await Comment.create({
        user_id,
        post_id,
        text,
      });
    },
    //ADD CRYPTOCURRENCY
    addCrypto: async (parent, { crypto_name, holding_amount, user_id }) => {
      try {
        const searchCrypto = await Crypto.findOne({
          where: { user_id, crypto_name: crypto_name.toLowerCase() },
        });
        if (searchCrypto) {
          return searchCrypto.update({
            ...searchCrypto,
            holding_amount: searchCrypto.holding_amount + holding_amount,
          });
        } else {
          await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${crypto_name}`
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log('test', res);
              if (res.body) {
                return Crypto.create({
                  crypto_name: crypto_name.toLowerCase(),
                  holding_amount,
                  user_id,
                });
              } else {
                throw new Error('Unable to find CryptoCurrency');
              }
            });
        }
      } catch (e) {
        throw new Error('Unable to add CryptoCurrency');
      }
    },
    updateCrypto: async (parent, { id, holding_amount }) => {
      try {
        const searchCrypto = await Crypto.findOne({
          where: { id },
        });
        if (searchCrypto) {
          return await searchCrypto.update({
            ...searchCrypto,
            holding_amount,
          });
        } else {
          throw new Error('Unable to find CryptoCurrency');
        }
      } catch (e) {
        throw new Error('Unable to update CryptoCurrency');
      }
    },
    removeFollower: async(parent, { follower_user_id, followed_user_id }) => {
      try {
        const findFollower = await Follow.findOne({
          where: { follower_user_id, followed_user_id },
        });
        if (findFollower) {
          await findFollower.destroy({})
        } else {
          throw new Error ('Unable to find Follower')
        }
      } catch (e) {
        throw new Error('Unable to remove Follower')
      }
    },
    removeFollowing: async(parent, { follower_user_id, followed_user_id }) => {
      try {
        const findFollowing = await Follow.findOne({
          where: { follower_user_id, followed_user_id },
        });
        if (findFollowing) {
          await findFollowing.destroy({})
        } else {
          throw new Error ('Unable to find Follower')
        }
      } catch (e) {
        throw new Error('Unable to remove Follower')
      }
    },
    addMessage: async(parent, { text, sender_id, receiver_id}) => {
      try {
        return await Message.create({ text, sender_id, receiver_id })
      } catch (e) {
        throw new Error('Unable to Create a Message')
      }
    }
  },
};

module.exports = resolvers;
