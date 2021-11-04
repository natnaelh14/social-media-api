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
    followers: async (parent, { followed_user_id }) => {
      const followers = await Follow.findAll({
        where: { followed_user_id }
      });
      return followers;
    }
  },
};

module.exports = resolvers;
