"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("DailyActivities", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        await queryInterface.addIndex("DailyActivities", {
            fields: ["userID", "activityDate", "app"],
            name: "unique_user_activity_app",
            unique: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("DailyActivities");
    },
};
