"use strict";
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [];

        // Generate 10 random users
        for (let i = 0; i < 10; i++) {
            const user = {
                firstName: faker.name.findName(),
                lastName: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                createdAt: new Date(),
                updatedAt: new Date(),
                parentId: i ? Math.floor(Math.random() * i) + 1 : null,
            };
            users.push(user);
        }

        // Insert the generated users into the 'users' table
        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface, Sequelize) {
        // Remove the inserted users from the 'users' table
        await queryInterface.bulkDelete("users", null, {});
    },
};
