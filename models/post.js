'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      db.Post.hasMany(db.Cart, { foreignKey: 'id', sourceKey: 'postId'});
    }
  };
  Post.init({
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    img: DataTypes.STRING,
    priceUnit: DataTypes.STRING,
    volume: DataTypes.STRING,
    delivery: DataTypes.STRING,
    origin: DataTypes.STRING,
    wrap: DataTypes.STRING,
    allergyInfo: DataTypes.STRING,
    expirationDate: DataTypes.STRING,
    regularArrival: DataTypes.STRING,
    warrantyExpirationDate: DataTypes.STRING,
    notification: DataTypes.STRING,
    productSelection: DataTypes.STRING,
    goodsQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};