"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("DailyActivities", {
            userID: {
                primaryKey: true,
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
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("DailyActivities");
    },
};
