'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_game.hasMany(models.game_history, {
        foreignKey: 'user_id'
      })
    }
  }
  user_game.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_place: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      allowNull: true,
      type: DataTypes.DATE
    },
    points: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};