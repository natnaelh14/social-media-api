const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reaction extends Model {}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comment',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'reaction',
  }
);

module.exports = Reaction;
