"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("DailyActivities", {
            userID: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            activityDate: {
                type: Sequelize.DATEONLY,
            },
            app: {
                type: Sequelize.STRING,
            },
            duration: {
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        await queryInterface.addIndex("DailyActivities", [
            "userID",
            "activityDate",
            "app",
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("DailyActivities");
    },
};
