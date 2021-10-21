'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        required: true,
      },
      postId: {
        type: Sequelize.STRING,
        required: true,
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
      },
      quantity: {
        type: Sequelize.STRING,
        required: true,
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
    await queryInterface.dropTable('Carts');
  },
};
