const { Sequelize, Op } = require("sequelize");
const db = require("../models/index.js");
const { StatusCodes } = require("http-status-codes");
const { date } = require("../utils/utils.js");

const { User, Friends, ChildIncentive } = db;

class FriendRepository {
    async getFriendsInfo(userID) {
        try {
            const friends = await Friends.findAll({
                attributes: ["userID1", "userID2", "isAccepted"],
                include: [
                    {
                        model: User,
                        as: "user1",
                        attributes: ["userID", "firstName", "lastName"],
                    },
                    {
                        model: User,
                        as: "user2",
                        attributes: ["userID", "firstName", "lastName"],
                    },
                ],
                where: {
                    [Sequelize.Op.or]: [
                        { userID1: userID },
                        { userID2: userID },
                    ],
                },
            });

            console.log("Fetched Friends Info Successfully", friends);

            const incoming = [];
            const outgoing = [];
            const confirmed = [];

            friends.forEach((data) => {
                const { userID1, isAccepted } = data;
                if (isAccepted) {
                    confirmed.push(userID1 == userID ? data.user2 : data.user1);
                } else if (userID1 == userID) {
                    outgoing.push(data.user2);
                } else {
                    incoming.push(data.user1);
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
            console.error("Error Sending Friend friend:", error);
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
            console.error("Error Accepting friend request:", error);
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
                    SUM(IF(DATE(ChildIncentives.createdAt) = (:currentDate), coinsEarned, 0)) AS points
                FROM 
                    Users
                LEFT JOIN 
                    ChildIncentives ON Users.userID = ChildIncentives.userID
                WHERE
                    Users.userID IN (:userIDs)
                GROUP BY
                    Users.userID
                ORDER BY
                    points DESC;
            `;

            const friendsInfo = await this.getFriendsInfo(userID);
            const { confirmed: friends } = friendsInfo;

            const leaderboard = await db.sequelize.query(query, {
                replacements: {
                    currentDate: date.getCurrentDate(),
                    userIDs: [
                        ...friends.map((friend) => friend.userID),
                        parseInt(userID),
                    ],
                },
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
