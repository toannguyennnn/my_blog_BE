"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        fullname: "name 1",
        email: "tt@gmail.com",
        phonenumber: "034654545",
        password: "123456",
        userGroup_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "name 2",
        email: "tt@gmail.com",
        phonenumber: "034654545",
        password: "123456",
        userGroup_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "name 3",
        email: "tt@gmail.com",
        phonenumber: "034654545",
        password: "123456",
        userGroup_id: 2,
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
