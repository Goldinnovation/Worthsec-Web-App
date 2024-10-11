import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from '../libs/prisma';
import { Response, Request } from "express";




/**
 * Purpose Statement--userJoinEvent
 * 
 * The function allows the current user to join an Event. 
 * Furthermore it gives the user the ability to store and retrieve all necessary information related to the event.

*/



interface AuthenticatedRequest extends Request{
    user?: any
}


  async function  userJoinEvent (req: AuthenticatedRequest, res: Response): Promise<void> {

    const joined_user_id = req.user.userId
    const joined_event_id = req.body.joinEventId

    console.log(joined_event_id);
    console.log(joined_user_id);

    try {
        if (joined_user_id && joined_event_id ) {

            const joinusertoEvent = await prisma.userJoinEvent.create({
                data:
                {
                    user_id: joined_user_id,
                    event_id: joined_event_id
                }
            })

            // console.log(joinusertoEvent)
            res.status(200).json({ message: "user successfully Join a event" })
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside" })

    }

}


export default userJoinEvent;
