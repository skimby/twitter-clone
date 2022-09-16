'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        id: 1,
        userId: 2,
        tweetId: 1,
        comment: 'omg how cool!',
        image: null,
        gif: null
      },
      {
        id: 2,
        userId: 2,
        tweetId: 5,
        comment: 'hello you',
        image: 'https://camo.githubusercontent.com/7a7041973dd4366d0cb9f3e7992786affa8d5bf9af91ba5e8e8ecb7aa1be8ede/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323630302f312a304b464231375f4e47545042305857796334425367512e6a706567',
        gif: null
      },
      {
        id: 3,
        userId: 1,
        tweetId: 4,
        comment: 'i feel the same way!',
        image: null,
        gif: 'https://media.giphy.com/media/QCJFiJfnDCdFa84sLG/giphy.gif'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', {})
  }
};
