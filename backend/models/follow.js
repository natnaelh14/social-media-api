const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    follower_user_id: {
      type: DataTypes.STRING,
    },
    followed_user_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'follow',
  }
);

module.exports = Follow;