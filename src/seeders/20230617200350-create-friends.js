"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const friends = [];
        for (let i = 1; i <= 30; i++) {
            friends.push({
                userID1: (i % 10) + 1,
                userID2: ((i + 1) % 10) + 1,
                isAccepted: Math.floor(Math.random() * 100) % 2 === 0,
            });
        }

        await queryInterface.bulkInsert("Friends", friends, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Friends", null, {});
    },
};
