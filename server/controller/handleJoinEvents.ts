import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { Response, Request } from "express";




/**
 * Purpose Statement--userJoinEvent
 * 
 * The function allows the current user to join an Event. 
 * Furthermore it gives the user the ability to store and retrieve all necessary information related to the event.



/**
 * Function Signature--userJoinEvent
 * 
 * @param {string} joined_user_id - The value represents the ID of the current user that joined the Event.
 * @param {string} joined_event_id - The value represents the ID of the Event that the user would like to join.
 * @returns {string} Returns a statement that the user was successfully stored in the JoinEvent table.
 */


interface AuthenticatedRequest extends Request{
    user: any
}


async function userJoinEvent(req: AuthenticatedRequest, res: Response) {

    const joined_user_id = req.user.userId
    const joined_event_id = req.body.joinEventId

    console.log(joined_event_id);
    console.log(joined_user_id);

    try {
        if (req.user && req.body) {

            const joinusertoEvent = await prisma.userJoinEvent.create({
                data:
                {
                    user_id: joined_user_id,
                    event_id: joined_event_id
                }
            })

            // console.log(joinusertoEvent)
            res.status(200).json({ message: "user successfully favored a event" })
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside" })

    }

}


export default userJoinEvent;
