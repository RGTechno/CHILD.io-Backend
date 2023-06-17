"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Friends", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userID1: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            userID2: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            isAccepted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        });

        await queryInterface.addConstraint("Friends", {
            fields: ["userID1", "userID2"],
            type: "unique",
            name: "unique_userID_pair",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Friends");
    },
};
