'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Follows', [
      {
        id: 1,
        userId: 1,
        followerId: 2
      },
      {
        id: 2,
        userId: 1,
        followerId: 3
      },
      {
        id: 3,
        userId: 2,
        followerId: 1
      },
      {
        id: 4,
        userId: 3,
        followerId: 1
      },
      {
        id: 5,
        userId: 1,
        followerId: 3
      },
      {
        id: 6,
        userId: 1,
        followerId: 4
      },
      {
        id: 7,
        userId: 1,
        followerId: 5
      },
      {
        id: 8,
        userId: 1,
        followerId: 6
      },
      {
        id: 9,
        userId: 1,
        followerId: 7
      },
      {
        id: 10,
        userId: 1,
        followerId: 8
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Follows', {})

  }
};
