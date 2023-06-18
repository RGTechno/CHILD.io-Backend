const { ChildRepository } = require("../repositories/repositories.js");
const { Response } = require("../utils/utils.js");
const { StatusCodes } = require("http-status-codes");

const childRepo = new ChildRepository();

async function linkParent(req, res) {
    const { parentID, userID } = req.body;
    try {
        await childRepo.linkParent(userID, parentID);
        return res
            .status(StatusCodes.OK)
            .json(
                new Response(true, `Successfully Linked to Parent ${parentID}`)
            );
    } catch (err) {
        const {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            error = {},
            message = "Something went wrong",
        } = err.error;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

async function getAppUsage(req, res) {
    const { userID } = req.query;
    try {
        const result = await childRepo.getAppUsage(userID);
        return res
            .status(StatusCodes.OK)
            .json(new Response(true, `Successfully Fetched App Usage`, result));
    } catch (err) {
        const {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            error = {},
            message = "Something went wrong",
        } = err.error;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

async function updateAppUsage(req, res) {
    const { data } = req.body;
    try {
        const result = await childRepo.updateAppUsage(data);
        return res
            .status(StatusCodes.OK)
            .json(new Response(true, `Successfully Updated App Usage`, result));
    } catch (err) {
        const {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            error = {},
            message = "Something went wrong",
        } = err.error;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

async function getCoins(req, res) {
    const { userID } = req.query;
    try {
        const result = await childRepo.getCoins(userID);
        return res.status(StatusCodes.OK).json(
            new Response(true, `Successfully Fetched Coins`, {
                coins: result,
            })
        );
    } catch (err) {
        const {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
            error = {},
            message = "Something went wrong",
        } = err.error;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

module.exports = {
    linkParent,
    getAppUsage,
    updateAppUsage,
    getCoins,
};
