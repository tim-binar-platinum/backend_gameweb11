'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      game_history.belongsTo(models.user_game)

    }
  }
  game_history.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('win', 'lose')
  }, {
    sequelize,
    modelName: 'game_history',
  });
  return game_history;
};