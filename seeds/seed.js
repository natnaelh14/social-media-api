const sequelize = require('../config/connection');
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
const userData = require('./userData.json');
const postData = require('./postData.json');
const followData = require('./followData.json');
const commentData = require('./commentData.json');
const messageData = require('./messageData.json');
const reactionData = require('./reactionData.json');
const hashtagData = require('./hashtagData.json');
const cryptoData = require('./cryptoData.json');
const friendRequestData = require('./friendRequestData.json');

const colors = require('colors');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // //USER
    // await User.bulkCreate(userData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    //POST
    await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    });
    // //FOLLOW
    // await Follow.bulkCreate(followData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    // //COMMENT
    // await Comment.bulkCreate(commentData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    // //MESSAGE
    // await Message.bulkCreate(messageData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    // //REACTION
    // await Reaction.bulkCreate(reactionData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    // //HASHTAG
    // await Hashtag.bulkCreate(hashtagData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    // //CRYPTO
    // await Crypto.bulkCreate(cryptoData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    // //FRIEND REQUEST
    // await FriendRequest.bulkCreate(friendRequestData, {
    //   individualHooks: true,
    //   returning: true,
    // });
    console.log('Data Imported!'.green.inverse);
    process.exit(0);
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

seedDatabase();
