"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Friends extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Friends.belongsTo(models.User, {
                foreignKey: "userID1",
                as: "user1",
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });

            Friends.belongsTo(models.User, {
                foreignKey: "userID2",
                as: "user2",
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        }
    }
    Friends.init(
        {
            userID1: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            userID2: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "userID",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            isAccepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Friends",
            timestamps: false,
        }
    );
    return Friends;
};
