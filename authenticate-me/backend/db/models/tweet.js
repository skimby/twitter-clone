'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {

    static associate(models) {
      Tweet.belongsTo(models.User,
        { foreignKey: 'userId' })

      Tweet.hasMany(models.Retweet, {
        foreignKey: 'tweetId'
      })
      Tweet.hasMany(models.Like, {
        foreignKey: 'tweetId'
      })
      Tweet.hasMany(models.Comment, {
        foreignKey: 'tweetId'
      })
    }
  }
  Tweet.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tweet: {
      type: DataTypes.STRING(280),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        onlyOneUrl(value) {
          if (this.image !== null && this.gif !== null) {
            throw new Error('Only one url input can be used in tweet. (Either an image or gif but not both.)')
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
            throw new Error('Only one url input can be used in tweet. (Either an image or gif but not both.)')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};
