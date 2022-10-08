'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Retweets', [
      {
        userId: 2,
        tweetId: 1
      },
      {
        userId: 3,
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
        userId: 1,
        tweetId: 5
      },
      {

        userId: 4,
        tweetId: 1
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Retweets', {})

  }
};
