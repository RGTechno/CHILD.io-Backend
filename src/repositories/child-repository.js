const { Op, Sequelize } = require("sequelize");
const db = require("../models/index.js");
const { StatusCodes } = require("http-status-codes");
const Logger = require("../config/logger-config.js");
const { date } = require("../utils/utils.js");

const { User, DailyActivity, ChildIncentive } = db;

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
        try {
            const result = await DailyActivity.findAll({
                where: {
                    userID,
                    activityDate: {
                        [Op.eq]: date.getCurrentDate(),
                    },
                },
            });
            Logger.log("info", result);
            console.log("successfully fetched daily activities");
            return result;
        } catch (error) {
            console.log("failed to fetch daily activities");
            Logger.log("error", error);
            throw { error };
        }
    }

    async updateAppUsage(data) {
        try {
            const result = await DailyActivity.bulkCreate(data, {
                updateOnDuplicate: ["duration", "updatedAt"],
            });
            console.log("Data inserted or updated successfully.");
            return result;
        } catch (error) {
            console.error("Error occurred:", error);
            Logger.log("error", error);
            throw { error };
        }
    }

    async getCoins(userID) {
        try {
            const result = await ChildIncentive.sum("coinsEarned", {
                where: {
                    userID,
                },
            });
            console.log("Data inserted or updated successfully.");
            return result;
        } catch (error) {
            console.log(error);
            throw { error };
        }
    }
}

module.exports = ChildRepository;
