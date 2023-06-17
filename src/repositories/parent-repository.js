const db = require("../models/index.js");

const { ChildIncentive } = db;

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
}

module.exports = ParentRepository;
