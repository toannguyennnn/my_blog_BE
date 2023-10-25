"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        url: "/blogs",
        description: "get blog",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "/create-blog",
        description: "normal user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "/users",
        description: "get user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
