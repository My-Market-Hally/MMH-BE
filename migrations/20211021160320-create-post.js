'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        required: true,
      },
      price: {
        type: Sequelize.STRING,
        required: true,
      },
      img: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
      },
      priceUnit: {
        type: Sequelize.STRING,
      },
      volume: {
        type: Sequelize.STRING,
      },
      delivery: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      wrap: {
        type: Sequelize.STRING,
      },
      allergyInfo: {
        type: Sequelize.STRING,
      },
      expirationDate: {
        type: Sequelize.STRING,
      },
      regularArrival: {
        type: Sequelize.STRING,
      },
      warrantyExpirationDate: {
        type: Sequelize.STRING,
      },
      notification: {
        type: Sequelize.STRING,
      },
      productSelection: {
        type: Sequelize.STRING,
      },
      goodsQuantity: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  },
};
