const { User, Post, Follow } = require('../models');

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: async () => {
      return await User.findAll({});
    },
    user: async (parent, { id }) => {
      const user = await User.findOne({
        where: { id },
      });
      return user;
    },
    // POST RESOLVERS
    posts: async () => {
      return await Post.findAll({});
    },
    post: async (parent, { id }) => {
      const user = await Post.findOne({
        where: { id },
      });
      return user;
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
  },
};

module.exports = resolvers;
