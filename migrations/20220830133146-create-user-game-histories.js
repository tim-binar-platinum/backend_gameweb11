'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserGameRoomId: {
        type: Sequelize.INTEGER
      },
      playerOneUserId: {
        type: Sequelize.INTEGER
      },
      playerOnePick: {
        type: Sequelize.STRING
      },
      playerOneStatus: {
        type: Sequelize.STRING
      },
      playerTwoUserId: {
        type: Sequelize.INTEGER
      },
      playerTwoPick: {
        type: Sequelize.STRING
      },
      playerTwoStatus: {
        type: Sequelize.STRING
      },
      winnerUserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_histories');
  }
};