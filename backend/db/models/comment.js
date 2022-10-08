'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Tweet,
        { foreignKey: 'tweetId' })

      Comment.belongsTo(models.User,
        { foreignKey: 'userId' })
    }
  }
  Comment.init({

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(280),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        onlyOneUrl(value) {
          if (this.image !== null && this.gif !== null) {
            throw new Error('Only one url input can be used in comment. (Either an image or gif but not both.)')
          }
        }
      }
    },
    gif: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        onlyOneUrl(value) {
          if (this.image !== null && this.gif !== null) {
            throw new Error('Only one url input can be used in comment. (Either an image or gif but not both.)')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
