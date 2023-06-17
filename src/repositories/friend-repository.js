const { Sequelize } = require("sequelize");
const db = require("../models/index.js");

const { Friends } = db;

class FriendRepository {
    async getFriendsInfo(userID) {
        try {
            const friends = await Friends.findAll({
                attributes: ["userID1", "userID2", "isAccepted"],
                where: {
                    [Sequelize.Op.or]: [
                        { userId1: userID },
                        { userId2: userID },
                    ],
                },
            });
            console.log("Fetched Friends Info Successfully");
            const incoming = [],
                outgoing = [],
                confirmed = [];
            friends.forEach((data) => {
                const { userID1, userID2, isAccepted } = data;
                if (isAccepted) {
                    confirmed.push(userID1 == userID ? userID2 : userID1);
                } else if (userID1 == userID) {
                    outgoing.push(userID2);
                } else {
                    incoming.push(userID1);
                }
            });

            return { incoming, outgoing, confirmed };
        } catch (error) {
            console.error("Failed to fetch Friends Info:", error);
            throw { error };
        }
    }
}

module.exports = FriendRepository;
