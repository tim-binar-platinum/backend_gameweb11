'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_game_histories', [{
      userGameId: 1,
      play_time: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      score: 'win'
    }, {
      userGameId: 2,
      play_time: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      score: 'win'
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_game_histories', null, {})
  }
};
