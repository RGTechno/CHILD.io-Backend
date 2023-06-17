"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ChildIncentive extends Model {
        static associate(models) {
            // Define associations here
        }
    }
    ChildIncentive.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userID: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            coinsEarned: DataTypes.INTEGER,
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            modelName: "ChildIncentive",
            tableName: "ChildIncentives", // Optional: Specify the table name if it differs from the model name
            timestamps: false, // Optional: If you don't need Sequelize to handle timestamps for this model
        }
    );
    return ChildIncentive;
};
