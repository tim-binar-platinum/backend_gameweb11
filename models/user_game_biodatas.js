'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodatas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_game_biodatas.belongsTo(models.user_games)
    }
  }
  user_game_biodatas.init({
    userGameId: DataTypes.INTEGER,
    dob: DataTypes.DATEONLY,
    pob: DataTypes.STRING,
    city: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female')
  }, {
    sequelize,
    modelName: 'user_game_biodatas',
  });
  return user_game_biodatas;
};