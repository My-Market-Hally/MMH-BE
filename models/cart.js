'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      db.Cart.belongsTo(db.Users, { foreignKey: 'userId', targetKey: 'userId'});
      db.Cart.belongsTo(db.Post, { foreignKey: 'id', targetKey: 'postId'});
    }
  }
  Cart.init(
    {
      userId: DataTypes.STRING,
      postId: DataTypes.STRING,
      title: DataTypes.STRING,
      price: DataTypes.STRING,
      img: DataTypes.STRING,
      quantity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
