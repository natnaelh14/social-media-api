const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Crypto extends Model {}

Crypto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    crypto_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    holding_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'crypto',
  }
);

module.exports = Crypto;
