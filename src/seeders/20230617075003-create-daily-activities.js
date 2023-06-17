"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const currentDate = new Date();
        const activities = [];

        for (let i = 0; i < 50; i++) {
            activities.push({
                userID: Math.floor(Math.random() * 10) + 1,
                activityDate: currentDate,
                app: `App ${i + 1}`,
                duration: Math.floor(Math.random() * 120) + 60,
            });
        }

        await queryInterface.bulkInsert("DailyActivities", activities, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("DailyActivities", null, {});
    },
};
