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

    async sendFriendRequest(senderUserID, receiverUserID) {
        try {
            const friend = await Friends.create({
                userID1: senderUserID,
                userID2: receiverUserID,
            });

            console.log("Friend Request Sent Successfully:", friend.toJSON());
            return friend;
        } catch (error) {
            console.error("Error inserting friend:", error);
            throw { error };
        }
    }

    async acceptFriendRequest(senderUserID, receiverUserID) {
        try {
            const result = await Friends.update(
                { isAccepted: 1 },
                {
                    where: {
                        userID1: senderUserID,
                        userID2: receiverUserID,
                    },
                }
            );

            console.log("Friend Request Accepted Successfully");
            return result;
        } catch (error) {
            console.error("Error Accepted friend request:", error);
            throw { error };
        }
    }
}

module.exports = FriendRepository;
