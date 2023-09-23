"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "example@example.com",
          password: "123456",
          phonenumber: "1234565478",
          address: "YD,BG",
          gender: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John2",
          lastName: "Doe",
          email: "example@example.com",
          password: "123456",
          phonenumber: "1234565478",
          address: "YD,BG",
          gender: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John3",
          lastName: "Doe",
          email: "example@example.com",
          password: "123456",
          phonenumber: "1234565478",
          address: "YD,BG",
          gender: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
