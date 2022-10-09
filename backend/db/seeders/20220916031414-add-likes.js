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


      {

        userId: 3,
        tweetId: 14
      },
      {

        userId: 1,
        tweetId: 17
      },
      {

        userId: 5,
        tweetId: 4
      },
      {

        userId: 1,
        tweetId: 6
      },
      {

        userId: 13,
        tweetId: 1
      },
      {

        userId: 12,
        tweetId: 3
      },
      {

        userId: 8,
        tweetId: 8
      },
      {
        userId: 9,
        tweetId: 10
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Likes', {})

  }
};
