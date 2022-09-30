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
    ])

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Retweets', {})

  }
};
