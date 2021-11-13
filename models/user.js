const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'The email you entered is invalid. Please try again',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['FEMALE', 'MALE', 'OTHER']],
      },
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [
          ['HAPPY', 'SAD', 'EXCITED', 'AMUSED', 'OPTIMISTIC', 'FRUSTRATED'],
        ],
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        newUserData.email = await newUserData.fname.trim();
        newUserData.handle = await newUserData.lname.trim();
        return newUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = User;
