"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "SuperAdminAccount",
          password:
            "$2b$10$QeeFy6y2AoUmsvyFXSYcxOPFFDs8TURYtLu/gSnYYxlRp8UyOtpUG", //1234567
          status: "superAdmin",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
