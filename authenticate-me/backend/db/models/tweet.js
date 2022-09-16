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
      allowNull: true
    },
    gif: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};
