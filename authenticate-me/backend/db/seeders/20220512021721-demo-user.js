"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: "demo@user.io",
        username: "demo",
        bio: 'I am a demo user',
        location: 'Dallas, TX',
        website: 'www.demo.com',
        profileImage: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F11%2F03%2Fpomeranian-172575221-2000.jpg',
        coverImage: 'https://www.akc.org/wp-content/uploads/2017/11/Pomeranian-puppies-sitting-on-a-white-background.jpg',
        verified: false,
        password: bcrypt.hashSync("password")
      },
      {
        firstName: 'Blue',
        lastName: 'Bird',
        email: "bluebird@user.io",
        username: "blubird",
        bio: 'I am the Twitter logo bird!',
        location: null,
        website: null,
        profileImage: 'http://store-images.s-microsoft.com/image/apps.50484.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.2c71c1ea-c28f-4dd1-b72d-c43cdd3476f4',
        coverImage: null,
        verified: false,
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
        coverImage: null,
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
