"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, email, username, bio, location, website, profileImage, coverImage, verfied } = this;
      return { id, firstName, lastName, email, username, bio, location, website, profileImage, coverImage, verfied };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.password.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static associate(models) {
      // define association here
    }

    static async login({ username, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: username
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }

    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30]
        }
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["password", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["password"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
