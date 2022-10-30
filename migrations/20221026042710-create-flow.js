"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameRecipients: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      idList: {
        type: Sequelize.INTEGER,
        references: {
          model: "listbarangs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flows");
  },
};
