const Sequelize = require("sequelize");

module.exports = class Cart extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        postId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
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
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        quantity: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Cart",
        tableName: "carts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Cart.belongsTo(db.User, { foreignKey: "userId", targetKey: "userId" });
    db.Cart.belongsTo(db.Post, { foreignKey: "id", targetKey: "id" });
  }
};
