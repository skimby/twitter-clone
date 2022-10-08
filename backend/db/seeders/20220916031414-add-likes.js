'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Likes', [
      {

        userId: 1,
        tweetId: 2
      },
      {

        userId: 1,
        tweetId: 4
      },
      {

        userId: 2,
        tweetId: 5
      },
      {

        userId: 3,
        tweetId: 1
      },
      {

        userId: 3,
        tweetId: 2
      },
      {

        userId: 3,
        tweetId: 5
      },
      {

        userId: 3,
        tweetId: 6
      },
      {

        userId: 2,
        tweetId: 1
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Likes', {})

  }
};
