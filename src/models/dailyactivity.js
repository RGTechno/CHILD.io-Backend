"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DailyActivity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DailyActivity.init(
        {
            userID: {
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            activityDate: DataTypes.DATEONLY,
            app: DataTypes.STRING,
            duration: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "DailyActivity",
            indexes: [
                {
                    unique: false,
                    fields: ["userID", "activityDate", "app"],
                },
            ],
        }
    );
    return DailyActivity;
};
