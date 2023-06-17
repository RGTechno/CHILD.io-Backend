const db = require("../models/index.js");

const { User, ChildIncentive } = db;

class ParentRepository {
    async insertChildIncentive(userID, coins) {
        try {
            const result = await ChildIncentive.create({
                userID,
                coinsEarned: coins,
            });
            console.log("Child Incentive inserted:", result.toJSON());
            return result;
        } catch (error) {
            console.error("Error inserting Child Incentive:", error);
            throw { error };
        }
    }
    async getChildren(userID) {
        try {
            const result = await User.findAll({
                where: {
                    parentID: userID,
                },
            });
            console.log("Sucessfully Fetched Children:", result);
            return result;
        } catch (error) {
            console.error("Error Fetching Children:", error);
            throw { error };
        }
    }
}

module.exports = ParentRepository;
