const { AuthRepository } = require("../repositories/repositories.js");
const Response = require("../utils/response/response.js");
const { StatusCodes } = require("http-status-codes");

const authRepo = new AuthRepository();

async function registerUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
        const data = await authRepo.Register(
            firstName,
            lastName,
            email,
            password
        );
        return res
            .status(StatusCodes.OK)
            .json(new Response(true, `Successfully Registered`, data));
    } catch (err) {
        const {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            error = {},
            message = "Something went wrong",
        } = err;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

module.exports = {
    registerUser,
};
