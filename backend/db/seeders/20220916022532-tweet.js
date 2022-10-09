'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tweets', [
      {
        userId: 1,
        tweet: 'tweet tweet!',
        image: null,
        gif: 'https://media.giphy.com/media/3dpG9uWjIOgQwIcLN3/giphy.gif'
      },
      {
        userId: 1,
        tweet: 'loving these bird gifs! hahaha',
        image: null,
        gif: 'https://media.giphy.com/media/3o7WIKJzFh68P9iJI4/giphy.gif'
      },
      {
        userId: 3,
        tweet: 'quinoa is soooo good in salads',
        image: null,
        gif: null
      },
      {
        userId: 4,
        tweet: "YOLO.... don't forget it!",
        image: null,
        gif: null
      }
      ,
      {
        userId: 5,
        tweet: "birds gonna bird i guess.",
        image: null,
        gif: null
      }
      ,
      {
        userId: 6,
        tweet: "some birds wake up and drink h8terade first thing in the morning!!",
        image: null,
        gif: null
      },
      {
        userId: 7,
        tweet: "we're soaring. flying. there's not a star in heaven that we can't reach. ",
        image: null,
        gif: null
      }, {
        userId: 8,
        tweet: "chirp chirp or tweet tweet?",
        image: null,
        gif: null
      },
      {
        userId: 2,
        tweet: 'What is this twitter business?',
        image: null,
        gif: null
      },
      {
        userId: 2,
        tweet: 'gm',
        image: null,
        gif: 'https://media.giphy.com/media/uBKCI6ZWqH6v5tOBUY/giphy.gif'
      },
      {
        userId: 3,
        tweet: 'Hello World',
        image: 'https://docs.microsoft.com/en-us/shows/hello-world/media/helloworld_383x215.png',
        gif: null
      },
      {
        userId: 2,
        tweet: '!!!',
        image: null,
        gif: null
      },
      {
        userId: 13,
        tweet: 'the early bird gets the worm!',
        image: null,
        gif: 'https://media.giphy.com/media/Ex8dvDuqesYa4r3bNV/giphy.gif'
      },
      {
        userId: 5,
        tweet: "Me at anyone who thinks flamingos are cooler.",
        image: null,
        gif: 'https://media.giphy.com/media/esdnu2REdAek0Mv8ew/giphy-downsized-large.gif'
      },
      {
        userId: 5,
        tweet: "sometimes i just feel like shooting laser eyes at some birds... smh",
        image: null,
        gif: 'https://media.giphy.com/media/cmm8UI1TfInVTYJWFU/giphy.gif'
      },
      {
        userId: 5,
        tweet: "if you don't think peacocks are the most beautiful bird, unfollow me.",
        image: null,
        gif: 'https://media.giphy.com/media/l1J9Forw8xWRvJNT2/giphy.gif'
      },
      {
        userId: 4,
        tweet: "I woke up like this",
        image: null,
        gif: 'https://media.giphy.com/media/sI9zGC4bh9eCI/giphy.gif'
      },
      {
        userId: 4,
        tweet: "Pink. That's all. That's the tweet.",
        image: null,
        gif: null
      },
      {
        userId: 3,
        tweet: "#respect for #vegans",
        image: null,
        gif: 'https://media.giphy.com/media/37QGcby081D8kwpNng/giphy.gif'
      },
      {
        userId: 3,
        tweet: ":)",
        image: null,
        gif: 'https://media.giphy.com/media/j45wv9P08oZBm/giphy-downsized-large.gif'
      },
      {
        userId: 6,
        tweet: "live in color!",
        image: null,
        gif: 'https://media.giphy.com/media/URZcG7uLd9h4s/giphy.gif'
      },
      {
        userId: 6,
        tweet: "The best cereal in the world obviously.",
        image: null,
        gif: 'https://media.giphy.com/media/JvMoHlI4hFOec/giphy.gif'
      },
      {
        userId: 6,
        tweet: "#teamglasshalffull !",
        image: null,
        gif: null
      }, {
        userId: 7,
        tweet: "Take pride in your country!",
        image: null,
        gif: 'https://media.giphy.com/media/TJexhI7yg05uy4YtE4/giphy.gif'
      },
      {
        userId: 7,
        tweet: "party in the usa-- on repeat. no shame!!!",
        image: null,
        gif: "https://media.giphy.com/media/3kCZUPb1YNAxQQ3bej/giphy.gif"
      },
      {
        userId: 8,
        tweet: "hahaha, yeah i guess this is another yellow bird!",
        image: 'https://www.dhresource.com/0x0/f2/albu/g4/M01/B6/C9/rBVaEFfrfKOAaTJ-AAKRDuN-160656.jpg',
        gif: null
      },
      {
        userId: 8,
        tweet: "woo hooo!!!",
        image: null,
        gif: "https://media.giphy.com/media/kHuLtYIhMcX6zxoMVH/giphy.gif"
      },
      {
        userId: 8,
        tweet: "Have you ever seen another cute, yellow bird before?",
        image: null,
        gif: null
      },
      {
        userId: 9,
        tweet: "It's pretty cold this time of year, but nothing I can't handle.",
        image: null,
        gif: null
      },
      {
        userId: 9,
        tweet: "Ugh, white is the hardest color to keep clean.. ",
        image: null,
        gif: null
      }, {
        userId: 9,
        tweet: "good night everyone",
        image: null,
        gif: 'https://media.giphy.com/media/l2JIaYp6P3WT5Ybu0/giphy.gif'
      },
      {
        userId: 10,
        tweet: "Man, i love the beach. Always a good breeze and tasty foods to snatch.",
        image: null,
        gif: null
      },
      {
        userId: 10,
        tweet: "OMG. had the best ice cream today!!",
        image: null,
        gif: 'https://media.giphy.com/media/262YUND3Uxb20/giphy.gif'
      },
      {
        userId: 10,
        tweet: "french fries are so good but have you ever had a curly fry before? #mindblown",
        image: null,
        gif: null
      },
      {
        userId: 11,
        tweet: "if a tree falls down in a forest and no one hears it, did it fall?",
        image: null,
        gif: null
      },
      {
        userId: 12,
        tweet: "I can and will kick my enemies.",
        image: null,
        gif: 'https://media.giphy.com/media/l3V0j3ytFyGHqiV7W/giphy.gif'
      },
      {
        userId: 13,
        tweet: "tweet!",
        image: null,
        gif: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tweets', {});

  }
};
