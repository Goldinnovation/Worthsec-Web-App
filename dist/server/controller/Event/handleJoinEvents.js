import prisma from '../../libs/prisma.js';
async function userJoinEvent(req, res) {
    try {
        const userId = req.user.userId;
        const eventId = req.body.joinEventId;
        if (!userId || userId === undefined || userId === " ") {
            res.status(400).json({ message: 'Invalid Request, userId is required' });
            return;
        }
        if (!eventId) {
            res.status(400).json({ message: 'Invalid Request, eventId is required' });
            return;
        }
        await prisma.userJoinEvent.create({
            data: {
                user_id: userId,
                event_id: eventId
            }
        });
        res.status(200).json({ message: "User has successfully join an event" });
    }
    catch (error) {
        console.log("Server Error on userJoinEvent handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export default userJoinEvent;
