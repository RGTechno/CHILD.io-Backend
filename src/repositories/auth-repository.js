const { Op, Sequelize } = require("sequelize");
const db = require("../models/index.js");
const { StatusCodes } = require("http-status-codes");

const { User } = db;

class AuthRepository {
    async Register(firstName, lastName, email, password) {
        try {
            const user = await User.create({
                firstName,
                lastName,
                email,
                password,
            });
            console.log("User register:", user);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw { error };
        }
    }
}

module.exports = AuthRepository;
