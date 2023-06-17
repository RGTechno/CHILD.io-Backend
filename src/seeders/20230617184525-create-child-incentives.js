"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const childIncentives = [];
        for (let i = 1; i <= 50; i++) {
            childIncentives.push({
                userID: Math.floor(Math.random() * 10) + 1,
                coinsEarned: Math.floor(Math.random() * 100) + 1,
            });
        }

        await queryInterface.bulkInsert("ChildIncentives", childIncentives, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("ChildIncentives", null, {});
    },
};
