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
      user_game_histories.belongsTo(models.user_games)
    }
  }
  user_game_histories.init({
    userGameId: DataTypes.INTEGER,
    play_time: DataTypes.DATE,
    score: DataTypes.ENUM('win', 'lose', 'draw')
  }, {
    sequelize,
    modelName: 'user_game_histories',
  });
  return user_game_histories;
};