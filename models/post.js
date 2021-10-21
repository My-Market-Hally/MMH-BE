const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        price: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        img: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        priceUnit: {
          type: Sequelize.STRING(20),
        },
        volume: {
          type: Sequelize.STRING(20),
        },
        delivery: {
          type: Sequelize.STRING(20),
        },
        origin: {
          type: Sequelize.STRING(20),
        },
        wrap: {
          type: Sequelize.STRING(20),
        },
        allergyInfo: {
          type: Sequelize.STRING(20),
        },
        expirationDate: {
          type: Sequelize.STRING(20),
        },
        regularArrival: {
          type: Sequelize.STRING(20),
        },
        warrantyExpirationDate: {
          type: Sequelize.STRING(20),
        },
        notification: {
          type: Sequelize.STRING(20),
        },
        productSelection: {
          type: Sequelize.STRING(20),
        },
        goodsQuantity: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.hasMany(db.Cart, { foreignKey: "id", sourceKey: "id" });
  }
};
