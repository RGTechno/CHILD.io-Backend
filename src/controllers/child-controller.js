const {
    ChildRepository,
    FriendRepository,
} = require("../repositories/repositories.js");
const Response = require("../utils/response/response.js");
const { StatusCodes } = require("http-status-codes");

const childRepo = new ChildRepository();
const friendsRepo = new FriendRepository();

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
        } = err;
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
        } = err;
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
        } = err;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

async function getFriendsInfo(req, res) {
    const { userID } = req.query;
    try {
        const result = await friendsRepo.getFriendsInfo(userID);
        return res
            .status(StatusCodes.OK)
            .json(
                new Response(true, `Successfully Fetched Friends Info`, result)
            );
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

async function sendFriendRequest(req, res) {
    const { senderUserID, receiverUserID } = req.body;
    try {
        const result = await friendsRepo.sendFriendRequest(
            senderUserID,
            receiverUserID
        );
        return res
            .status(StatusCodes.OK)
            .json(
                new Response(true, `Friend Request Sent Sucessfully`, result)
            );
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

async function acceptFriendRequest(req, res) {
    const { senderUserID, receiverUserID } = req.body;
    try {
        const result = await friendsRepo.acceptFriendRequest(
            senderUserID,
            receiverUserID
        );
        return res
            .status(StatusCodes.OK)
            .json(
                new Response(
                    true,
                    `Friend Request Accepted Sucessfully`,
                    result
                )
            );
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
    linkParent,
    getAppUsage,
    updateAppUsage,
    getFriendsInfo,
    sendFriendRequest,
    acceptFriendRequest,
};
