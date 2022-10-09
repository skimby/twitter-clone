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
      }, {
        userId: 1,
        followerId: 13
      },
      {

        userId: 1,
        followerId: 8
      },
      {

        userId: 2,
        followerId: 13
      },
      {
        userId: 3,
        followerId: 5
      },
      {
        userId: 13,
        followerId: 1
      }
      ,
      {
        userId: 5,
        followerId: 1
      },

      {

        userId: 4,
        followerId: 10
      },
      {
        userId: 3,
        followerId: 9
      },
      {
        userId: 12,
        followerId: 3
      }
      ,
      {
        userId: 7,
        followerId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Follows', {})

  }
};
