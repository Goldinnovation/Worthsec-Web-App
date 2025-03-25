import prisma from '../../libs/prisma.js';
export async function userFavorsEvent(req, res) {
    try {
        const userId = req?.decodedUserId;
        const eventId = req.body?.favoreventId;
        if (userId === undefined) {
            res.status(400).json({ message: 'Invalid Request, userId does not exist' });
            return;
        }
        if (eventId === " " || eventId === undefined) {
            res.status(400).json({ message: 'Invalid Request: event Id does not match the requirements' });
            return;
        }
        await prisma.userFavourEvent.create({
            data: {
                currentUser_id: userId,
                event_id: eventId
            }
        });
        res.status(200).json({ message: "User successfully favored an event" });
    }
    catch (error) {
        console.log("Server Error on userFavorEventMobile handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getUserFavoredEvents(req, res) {
    try {
        const userId = req?.decodedUserId;
        if (userId === undefined || userId === " ") {
            res.status(400).json({ message: 'Invalid Request, userId does not exist' });
            return;
        }
        const favoredEvent = await prisma.userFavourEvent.findMany({
            where: {
                currentUser_id: userId
            },
        });
        getEventDetails(favoredEvent, res);
    }
    catch (error) {
        console.log("Server Error on getUserFavoredEvents handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getEventDetails = async (getFavoredEventId, res) => {
    try {
        if (getFavoredEventId.length === 0) {
            res.status(400).json({ message: 'Invalid Request, getFavoredEventId date is missing' });
            return;
        }
        const favoredEventsArr = [];
        const promiseEventData = getFavoredEventId.map(async (selectedEvents) => {
            const retrieveData = await prisma.event.findMany({
                where: {
                    eventId: selectedEvents.event_id
                }
            });
            favoredEventsArr.push(...retrieveData);
        });
        await Promise.all(promiseEventData);
        res.status(200).json(favoredEventsArr);
    }
    catch (error) {
        console.log("Server Error on findsEventsUserFavored handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default { userFavorEventMobile: userFavorsEvent, getUserFavoredEvents };
