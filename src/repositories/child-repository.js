const { Op, literal } = require("sequelize");
const db = require("../models/index.js");
const { StatusCodes } = require("http-status-codes");

const { User, DailyActivity } = db;

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
            throw { error };
        }
    }

    async getAppUsage(userID) {
        const daysDifference = 7;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        try {
            const result = await DailyActivity.findAll({
                where: {
                    userID,
                    activityDate: {
                        [Op.lt]: currentDate,
                        [Op.gte]: Sequelize.literal(
                            Sequelize.escape(
                                Sequelize.fn(
                                    "CURRENT_DATE - INTERVAL ? DAY",
                                    daysDifference
                                )
                            )
                        ),
                    },
                },
            });

            console.log("successfully fetched daily activities", result);
            return result;
        } catch (error) {
            console.log("failed to fetch daily activities");
            throw { error };
        }
    }
}

module.exports = ChildRepository;
