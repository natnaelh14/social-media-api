const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FriendRequest extends Model {}

FriendRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING',
      validate: {
        isIn: [['PENDING', 'CONFIRM', 'REJECT', 'BLOCKED']],
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'friendRequest',
  }
);

module.exports = FriendRequest;
