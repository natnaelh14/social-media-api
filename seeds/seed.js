const sequelize = require('../config/connection');
const { User, Post, Follow, Comment, Message, Reaction } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const followData = require('./followData.json');
const commentData = require('./commentData.json');
const messageData = require('./messageData.json');
const reactionData = require('./reactionData.json');

const colors = require('colors');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    //USER
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    //POST
    await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    });
    //FOLLOW
    await Follow.bulkCreate(followData, {
      individualHooks: true,
      returning: true,
    });
    //COMMENT
    await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });
    //MESSAGE
    await Message.bulkCreate(messageData, {
      individualHooks: true,
      returning: true,
    });
    //REACTION
    await Reaction.bulkCreate(reactionData, {
      individualHooks: true,
      returning: true,
    });
    console.log('Data Imported!'.green.inverse);
    process.exit(0);
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

seedDatabase();
