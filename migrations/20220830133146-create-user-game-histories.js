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
      userGameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: 'user_games',
          key: 'id'
        }
      },
      play_time: {
        type: Sequelize.DATE
      },
      score: {
        type: Sequelize.ENUM('win', 'lose', 'draw')
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