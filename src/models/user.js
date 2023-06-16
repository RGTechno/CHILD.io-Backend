"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {}
    }
    User.init(
        {
            userID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            parentID: {
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "userID",
                },
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
