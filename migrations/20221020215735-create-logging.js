"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("loggings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statusCode: {
        type: Sequelize.STRING,
      },
      error: {
        type: Sequelize.TEXT,
      },
      method: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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
    await queryInterface.dropTable("loggings");
  },
};
