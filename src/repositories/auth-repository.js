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
    async Login(email, password) {
        try {
            const user = await User.findOne({
                where: {
                    email,
                    password,
                },
            });

            if (user) {
                console.log("Login Successfull:", user);
                return user;
            }
            console.log("Email/Password does not match");
            throw {
                error: "Email/Password does not match",
                statusCode: StatusCodes.UNAUTHORIZED,
            };
        } catch (error) {
            console.error("Error logging in:", error);
            throw { error };
        }
    }
}

module.exports = AuthRepository;
