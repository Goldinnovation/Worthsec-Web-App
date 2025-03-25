import prisma from '../../libs/prisma.js';
export async function updatetoNewEventData(req, res) {
    try {
        const userId = req?.decodedUserId;
        const eventIds = req.body?.EventDataId;
        if (userId === undefined) {
            res.status(400).json({ message: 'Invalid Request, userId does not exist' });
            return;
        }
        if (!eventIds || eventIds.length !== 24) {
            res.status(400).json({ message: 'Invalid Request: eventId length does not match the requirements' });
            return;
        }
        const newEventData = await prisma.event.findMany({
            where: {
                eventId: {
                    notIn: eventIds,
                },
            },
            take: 27,
        });
        res.status(200).json(newEventData);
    }
    catch (error) {
        console.log("Server Error on updatetoNewEventData handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export default updatetoNewEventData;
