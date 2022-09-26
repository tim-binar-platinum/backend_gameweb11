'use strict';
const { user } = require('pg/lib/defaults');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  user_game_histories.init({
    UserGameRoomId: DataTypes.INTEGER,
    playerOneUserId: DataTypes.INTEGER,
    playerOnePick: DataTypes.STRING,
    playerOneStatus: DataTypes.STRING,
    playerTwoUserId: DataTypes.INTEGER,
    playerTwoPick: DataTypes.STRING,
    playerTwoStatus: DataTypes.STRING,
    winnerUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_game_histories',
  });
  return user_game_histories;
};