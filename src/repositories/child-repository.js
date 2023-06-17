const db = require("../models/index.js");
const { StatusCodes } = require("http-status-codes");

const { User } = db;

class ChildRepository {
    async linkParent(userID, parentID) {
        if (userID === parentID) {
            throw {
                message: "Can't link to the same user",
                statusCode: StatusCodes.FORBIDDEN,
            };
        }
        try {
            const result = await User.update(
                { parentID },
                {
                    where: {
                        userID,
                    },
                }
            );
            console.log("Update successful");
            return result;
        } catch (error) {
            console.error("Update failed:", error);
            throw {
                error,
                statusCode: StatusCodes.BAD_REQUEST,
                message: "Something went wrong",
            };
        }
    }
}

module.exports = ChildRepository;
