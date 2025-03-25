import prisma from '../../libs/prisma.js';
export async function exploreEvents(req, res) {
    try {
        const currentUserId = req.user.userId;
        // const userCity = req.body.city
        if (!currentUserId) {
            res.status(400).json({
                message: "Invalid Request from Client, user ID does not exist",
            });
        }
        // if (!userCity) {
        //     res.status(400).json({ message: "Invalid Request from Client, user City does not exist" })
        // }
        const getUserInterestsAndFriends = await prisma.account.findUnique({
            where: {
                userId: currentUserId,
            },
            include: {
                userInterest: {
                    select: {
                        interest_list: true,
                    },
                },
                userTouser: {
                    select: {
                        userFollowed: true,
                    },
                    take: 2,
                },
            },
        });
        if (getUserInterestsAndFriends) {
            processUserData(getUserInterestsAndFriends, req, res);
        }
    }
    catch (error) {
        console.log("Unexpected Server Error on exploreEvents function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const processUserData = (userData, req, res) => {
    try {
        const currentUserInterestData = userData?.userInterest?.interest_list;
        const currentUserFriends = userData?.userTouser;
        const userFriendsId = currentUserFriends?.map((prev) => prev?.userFollowed || []);
        // if (currentUserInterestData && userFriendsId.length > 0) {
        //     getUserFriendsInterests(currentUserInterestData, userFriendsId, req, res)
        // } else {
        getSpecifiedEventData(currentUserInterestData, req, res);
        // }
    }
    catch (error) {
        console.log("Unexpected Server Error on processUserData function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getUserFriendsInterests = async (currentUserInterestData, userFriendsId, req, res) => {
    try {
        const friendsInterestsData = [];
        const otherUserInterestData = userFriendsId.map(async (id) => {
            const interestData = await prisma.account.findUnique({
                where: {
                    userId: id,
                },
                include: {
                    userInterest: {
                        select: {
                            interest_list: true,
                        },
                    },
                },
            });
            const otherUserInterest = interestData?.userInterest?.interest_list || [];
            friendsInterestsData.push(...otherUserInterest);
        });
        await Promise.all(otherUserInterestData);
        processUserFriendsInterests(friendsInterestsData, currentUserInterestData, req, res);
    }
    catch (error) {
        console.log("Unexpected Server Error on handleSpecifiedEvent function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const processUserFriendsInterests = async (friendsInterestsData, currentUserInterestData, req, res) => {
    try {
        const uniqueFriendsInterestArr = [...new Set(friendsInterestsData)];
        // comparing the currentUser Interests with the other user Interest and removing equal Interest
        const comparingInterest = uniqueFriendsInterestArr?.filter((interestString) => !currentUserInterestData?.some((otherUserInterest) => otherUserInterest === interestString));
        if (comparingInterest.length === 0) {
            const defaultList = ["jazz", "Movie", "Art"];
            const defaultInterestData = [...currentUserInterestData, ...defaultList];
            getSpecifiedEventData(defaultInterestData, req, res);
        }
        else {
            const newInterestData = [];
            let sum = 0;
            for (const i of comparingInterest) {
                if (sum < 3) {
                    sum++;
                    newInterestData.push(i);
                }
            }
            if (newInterestData.length > 0 && currentUserInterestData) {
                const updatedInterstData = [
                    ...currentUserInterestData,
                    ...newInterestData,
                ];
                getSpecifiedEventData(updatedInterstData, req, res);
            }
        }
    }
    catch (error) {
        console.log("Unexpected Server Error on processuserFriendsInterests function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getSpecifiedEventData = async (data, req, res) => {
    try {
        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 7);
        const interestedEvents = await prisma.event.findMany({
            where: {
                // cityType: {
                //     in: userCity 
                // }, 
                eventType: {
                    in: data
                },
                // eventDate: {
                //     gte: today,
                //     lte: endDate
                // },
            },
            // orderBy: {
            //     eventDate: 'asc'
            // },
            take: 24
        });
        res.status(200).json(interestedEvents);
    }
    catch (error) {
        console.log("Unexpected Server Error on getSpecifiedEventData function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default { exploreEvents };
