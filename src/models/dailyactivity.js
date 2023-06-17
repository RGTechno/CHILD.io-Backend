"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class DailyActivity extends Model {
        static associate(models) {
            // define association here
        }
    }
    DailyActivity.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            activityDate: DataTypes.DATEONLY,
            app: DataTypes.STRING,
            duration: DataTypes.INTEGER,
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            modelName: "DailyActivity",
            indexes: [
                {
                    unique: true,
                    fields: ["userID", "activityDate", "app"],
                },
            ],
        }
    );
    return DailyActivity;
};
