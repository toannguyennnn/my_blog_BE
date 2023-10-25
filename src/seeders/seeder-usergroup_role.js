"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("UserGroup_Roles", [
      {
        userGroupId: "1",
        roleId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userGroupId: "1",
        roleId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userGroupId: "1",
        roleId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userGroupId: "2",
        roleId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userGroupId: "2",
        roleId: "2",
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
