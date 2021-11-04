const { User } = require('../models');

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
  },
};

module.exports = resolvers;
