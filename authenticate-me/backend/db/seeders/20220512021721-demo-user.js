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
        location: null,
        website: null,
        profileImage: null,
        coverImage: null,
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
        profileImage: null,
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
        profileImage: null,
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
