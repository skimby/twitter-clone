'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {

    static associate(models) {
      Follow.belongsTo(models.User,
        { foreignKey: 'userId', as: 'Follower' })
      Follow.belongsTo(models.User,
        { foreignKey: 'followerId', as: 'Following' })
    }
  }
  Follow.init({

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};
