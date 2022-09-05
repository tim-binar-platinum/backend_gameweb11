'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_game_biodatas', [{
      userGameId: 1,
      dob: '1997-05-12',
      pob: 'jakarta',
      city: 'jakarta',
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userGameId: 2,
      dob: '1997-05-12',
      pob: 'jakarta',
      city: 'jakarta',
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('user_game_biodatas', null, {})
  }
};
