'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Follows', [
      {

        userId: 1,
        followerId: 2
      },
      {

        userId: 1,
        followerId: 3
      },
      {

        userId: 2,
        followerId: 1
      },
      {

        userId: 3,
        followerId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Follows', {})

  }
};
