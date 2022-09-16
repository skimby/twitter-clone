'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Retweet extends Model {

    static associate(models) {
      Retweet.belongsTo(models.Tweet, {
        foreignKey: 'tweetId'
      })

    }
  }
  Retweet.init({
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
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Retweet',
  });
  return Retweet;
};
