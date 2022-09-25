'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = 'binar'
    const hash = bcrypt.hashSync(password, 10)

    await queryInterface.bulkInsert('user_admins', [{
      username: 'admin',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_admins', null, {})
  }
};
