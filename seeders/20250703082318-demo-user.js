"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash("laila123", 10);
    return queryInterface.bulkInsert("Users", [
      {
        first_name: "Laila",
        last_name: "Badriyah",
        email: "lailatul@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Maulana",
        last_name: "Arif",
        email: "maulana@example.com",
        password: await bcrypt.hash("maulana123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
