const sequelize = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');
const colors = require ('colors');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
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
