'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user_games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_games.hasOne(models.user_game_biodatas),
      user_games.hasMany(models.user_game_histories)
    }
  }
  user_games.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_games',
  });
  return user_games;
};