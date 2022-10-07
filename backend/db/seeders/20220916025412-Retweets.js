'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Retweets', [
      {
        id: 1,
        userId: 2,
        tweetId: 1
      },
      {
        id: 2,
        userId: 3,
        tweetId: 2
      },
      {
        id: 3,
        userId: 1,
        tweetId: 4
      },
      {
        id: 4,
        userId: 2,
        tweetId: 5
      },
      {
        id: 5,
        userId: 1,
        tweetId: 5
      },
      {
        id: 6,
        userId: 4,
        tweetId: 1
      },
    ])

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Retweets', {})

  }
};
