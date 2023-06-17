const { ChildRepository } = require("../repositories/repositories.js");
const Response = require("../utils/response/response.js");
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
        const { statusCode, error = {}, message } = err;
        return res
            .status(statusCode)
            .json(new Response(false, message, {}, error));
    }
}

module.exports = { linkParent };
