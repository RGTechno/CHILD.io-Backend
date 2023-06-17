const { ParentRepository } = require("../repositories/repositories.js");
const Response = require("../utils/response/response.js");
const { StatusCodes } = require("http-status-codes");

const parentRepo = new ParentRepository();

async function incentiviseChild(req, res) {
    const { childID, coins } = req.body;
    try {
        await parentRepo.insertChildIncentive(childID, coins);
        return res
            .status(StatusCodes.OK)
            .json(new Response(true, `Successfully Incentivised Child`));
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

module.exports = { incentiviseChild };
