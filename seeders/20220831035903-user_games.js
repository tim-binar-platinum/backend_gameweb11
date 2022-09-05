'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_games', [{
      username: 'emil',
      password: '1997',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'user',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_games', null, {})
  }
};
