const { Sequelize, Op } = require("sequelize");
const db = require("../models/index.js");
const { StatusCodes } = require("http-status-codes");

const { User, Friends, ChildIncentive } = db;

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

    async getLeaderBoard(userID) {
        try {
            const query = `
                SELECT 
                    Users.userID AS userID, 
                    firstName,
                    lastName,
                    SUM(IF(DATE(ChildIncentives.createdAt) = CURDATE(), coinsEarned, 0)) AS points
                FROM 
                    ChildIncentives
                JOIN 
                    Users ON Users.userID = ChildIncentives.userID
                WHERE
                    ChildIncentives.userID IN (:userIDs)
                GROUP BY
                    ChildIncentives.userID
                ORDER BY
                    points DESC;
            `;

            const friendsInfo = await this.getFriendsInfo(userID);
            const { confirmed: friends } = friendsInfo;

            const leaderboard = await db.sequelize.query(query, {
                replacements: { userIDs: [...friends, userID] },
                type: Sequelize.QueryTypes.SELECT,
                model: User,
            });

            return leaderboard;
        } catch (error) {
            console.error("Error Fetching Leaderboard:", error);
            throw { message: "Error Fetching Leaderboard" };
        }
    }
}

module.exports = FriendRepository;
