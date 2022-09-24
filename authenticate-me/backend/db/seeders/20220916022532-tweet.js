'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tweets', [
      {
        id: 1,
        userId: 1,
        tweet: 'my first tweet!',
        image: null,
        gif: 'https://media.giphy.com/media/TdfyKrN7HGTIY/giphy.gif'
      },
      {
        id: 2,
        userId: 1,
        tweet: 'my second tweet!',
        image: null,
        gif: 'https://giphy.com/clips/studiosoriginals-excitement-0j1lyc4cqsnfZTXcIR'
      },
      {
        id: 3,
        userId: 2,
        tweet: 'What is this twitter business? ',
        image: null,
        gif: null
      },
      {
        id: 4,
        userId: 2,
        tweet: 'This is pretty fun',
        image: 'https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?cs=srgb&dl=pexels-jill-wellington-40815.jpg&fm=jpg',
        gif: null
      },
      {
        id: 5,
        userId: 3,
        tweet: 'Hello World',
        image: 'https://docs.microsoft.com/en-us/shows/hello-world/media/helloworld_383x215.png',
        gif: null
      },
      {
        id: 6,
        userId: 2,
        tweet: '!!!',
        image: null,
        gif: null
      },
      {
        id: 7,
        userId: 1,
        tweet: 'tweet tweet',
        image: null,
        gif: null
      },
      {
        id: 8,
        userId: 5,
        tweet: "Me at anyone who thinks flamingos are cooler.",
        image: null,
        gif: 'https://media.giphy.com/media/esdnu2REdAek0Mv8ew/giphy-downsized-large.gif'
      },
      {
        id: 9,
        userId: 5,
        tweet: "I know I'm biased but pink is not the new pink...",
        image: null,
        gif: null
      },
      {
        id: 10,
        userId: 9,
        tweet: "I woke up like this",
        image: null,
        gif: 'https://media.giphy.com/media/sI9zGC4bh9eCI/giphy.gif'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tweets', {});

  }
};
