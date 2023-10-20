"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Blogs", [
      {
        title: "Blog 1",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam?",
        category: "category 1",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam? Esse unde commodi asperiores odit amet harum accusantium nemo rem quod, alias exercitationem architecto ratione deleniti facilis veniam voluptatum iste!",
        image: "",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Blog 2",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam?",
        category: "category 1",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam? Esse unde commodi asperiores odit amet harum accusantium nemo rem quod, alias exercitationem architecto ratione deleniti facilis veniam voluptatum iste!",
        image: "",
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Blog 3",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam?",
        category: "category 1",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam? Esse unde commodi asperiores odit amet harum accusantium nemo rem quod, alias exercitationem architecto ratione deleniti facilis veniam voluptatum iste!",
        image: "",
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Blog 4",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam?",
        category: "category 2",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, laboriosam? Esse unde commodi asperiores odit amet harum accusantium nemo rem quod, alias exercitationem architecto ratione deleniti facilis veniam voluptatum iste!",
        image: "",
        user_id: 1,
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
