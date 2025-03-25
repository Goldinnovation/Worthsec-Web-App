import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function getUserJoinedEvents(req, res) {
    try {
        const currentUser = req.user.userId;
        console.log('currentUser', currentUser);
        if (!currentUser) {
            res.status(400).json({ message: "Bad Request: currentUser data is invalid" });
        }
        const joinedUserId = await prisma.userJoinEvent.findMany({
            where: {
                user_id: currentUser
            }
        });
        res.status(200).json(joinedUserId);
    }
    catch (error) {
        console.log("Server Error on getUserJoinedEvents handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export default { getUserJoinedEvents };
