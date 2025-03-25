import prisma from '../../libs/prisma.js';
async function userGetCategoryEvent(req, res, next) {
    try {
        const userId = req?.decodedUserId;
        const selectedCategory = req.body.cateogory;
        if (userId === undefined) {
            res.status(400).json({ message: 'Invalid Request, userId does not exist' });
            return;
        }
        if (selectedCategory === " " || selectedCategory === undefined) {
            res.status(400).json({ message: 'Invalid Request: selectedCategory does not match the requirements' });
            return;
        }
        const UserselectedData = await prisma.event.findMany({
            where: {
                eventType: selectedCategory
            }
        });
        res.status(200).json(UserselectedData);
    }
    catch (error) {
        console.log("Server Error on userGetCategoryEvent handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export default userGetCategoryEvent;
