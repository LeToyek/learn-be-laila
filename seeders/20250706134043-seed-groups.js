"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groups", [
      {
        name: "admin",
        description: "Full access",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user",
        description: "Limited access",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "manager",
        description: "Manage team",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Groups", null, {});
  },
};
