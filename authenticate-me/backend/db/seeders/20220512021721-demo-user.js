"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        password: bcrypt.hashSync("password")
      },
      {
        email: "twitter@user.io",
        username: "TwitterBird",
        password: bcrypt.hashSync("password")
      },
      {
        email: "robin@user.io",
        username: "redrobin",
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
          [Op.in]: ["Demo-lition", "TwitterBird", "redrobin"]
        }
      },
      {}
    );
  }
};
