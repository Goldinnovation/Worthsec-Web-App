import prisma from '../../libs/prisma.js';
const storeInterestData = async (req, res, next) => {
    console.log('trigger');
    try {
        const userId = req?.decodedUserId;
        const selectedInterests = req.body.pickedIntesrest;
        console.log('userId', userId);
        console.log('selectedInterests', selectedInterests);
        if (!userId || userId === undefined || userId === " ") {
            res.status(400).json({ message: 'Invalid Request, userId is required' });
            return;
        }
        if (!selectedInterests) {
            res.status(400).json({ message: 'Invalid Request, selectedInterests is required' });
            return;
        }
        await prisma.userInterest.create({
            data: {
                user_interest_id: userId,
                interest_list: selectedInterests
            }
        });
        res.status(200).json({ message: "Interests are successfully stored" });
    }
    catch (error) {
        console.log("Server Error on storeInterestData handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default storeInterestData;
