"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: "demo@twitter.com",
        username: "demo",
        bio: 'I am the demo user and the official Twitter logo!',
        location: 'Everywhere',
        website: 'https://twitter.com',
        profileImage: 'http://store-images.s-microsoft.com/image/apps.50484.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.2c71c1ea-c28f-4dd1-b72d-c43cdd3476f4',
        coverImage: 'https://media.wired.com/photos/5941a9186600f013e9634520/191:100/w_1910,h_1000,c_limit/Twitter-FeatureArt.jpg',
        verified: true,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Red',
        lastName: 'Cardinal',
        email: "redcardinal@user.io",
        username: "cardinalred",
        bio: 'I am a red cardinal',
        location: null,
        website: null,
        profileImage: 'https://www.thespruce.com/thmb/wkOfT5zlicyWmVXPbNWylWi3tCE=/1208x906/smart/filters:no_upscale()/fun-facts-about-cardinals-385528-hero-828376fb000b418f9187bf085ff0795f.jpg',
        coverImage: 'https://nas-national-prod.s3.amazonaws.com/h_a1_3725_3_northern-cardinal_carole_wiley_kk_adult-male-and-adult-female_0.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Chicken',
        lastName: 'Poultry',
        email: "chicken@twitter.com",
        username: "chicken",
        bio: "The chicken came before the egg. Change my mind.",
        location: null,
        website: 'https://www.reddit.com/r/unpopularopinion/comments/9ipcat/chickfila_isnt_that_good/',
        profileImage: 'https://i.guim.co.uk/img/media/2772b902a53e15027e052888df50c38afe840881/0_43_4751_2851/master/4751.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ae665531ea34f8738a17e75c46524733',
        coverImage: 'https://www.chickens.allotment-garden.org/wp-content/uploads/2016/07/Happy-Chickens.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Flamingo',
        lastName: 'Pink',
        email: "flamingo@twitter.com",
        username: "pinkflaming",
        bio: "Pink is my favorite color but you already knew that.",
        location: 'Galapolos Islands',
        website: 'https://facts.net/flamingo-facts/',
        profileImage: 'https://images.unsplash.com/photo-1629394661462-13ea8fe156ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        coverImage: 'https://www.travelandleisure.com/thmb/nT4rCPeW_GCtozBoLuYpSFh0sn0=/775x581/smart/filters:no_upscale()/flamingo-beach-aruba-FLAM0517-b2f4c8163f154fbab2aea7b2d3139ae1.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Peacock',
        lastName: 'Pavo',
        email: "peacock@twitter.com",
        username: "peacockpart",
        bio: "Beauty is in the eye of the beholder.",
        location: 'India',
        website: 'https://www.nikwik.com/facts/wt5/beautiful-birds/#:~:text=Peacock%3A%20Peacock%20is%20the%20most,them%20look%20like%20a%20king.',
        profileImage: 'https://i.natgeofe.com/n/a4e20a18-8ae7-4f9a-be59-d7038dbd8d82/4463961_square.jpg',
        coverImage: 'https://cdn.hswstatic.com/gif/peacock-feathers.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "blubird", "cardinalred"]
        }
      },
      {}
    );
  }
};
