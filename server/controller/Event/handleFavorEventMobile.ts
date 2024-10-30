import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Purpose Statement--userFavourEvent
 * The function allows the current user to favour an Event. 
 * Furthermore it gives the user the ability to store and retrieve the data for a period of time.



/**
 * Function Signature--userFavourEvent
 * 
 * @param {string} currentUserId - The value represents the ID of the current user that favoured the Event.
 * @param {string} favour_event_Id - The value represents the ID of the Event that was favoured by the user.
 * @returns {string} Returns a statement that the user was successfully stored in the userFavourEvent table.
 */




interface AuthenticatedRequest extends Request{
    user?: any
}

interface DJwtPayload extends JwtPayload {
    userId: string;
    email: string;
  }
  const SECRET_KEY=  process.env.SECRET_KEY as string




export async function userFavorEventMobile(req: AuthenticatedRequest, res: Response): Promise<void> {

    console.log(req.body);
    const favour_event_Id = req.body.favoreventId
    const usertoken = req.body.token
    console.log(usertoken);
    const decoded = jwt.verify(usertoken, SECRET_KEY) as DJwtPayload
    const userIdviaToken = decoded.userId
    console.log(userIdviaToken);
    console.log(favour_event_Id);
  

    try {
        console.log('inside try');
        if (userIdviaToken && favour_event_Id) {
            // console.log('Hallo');

            const userfavoredEvent = await prisma.userFavourEvent.create({
                data:
                {
                    currentUser_id: userIdviaToken,
                    event_id: favour_event_Id
                }
            })

            // console.log(userfavoredEvent)
            res.status(200).json({ message: "user successfully favored a event" })
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside" })

    }

}


export async function getUserFavoredEvents(req: AuthenticatedRequest, res: Response): Promise<void> {

    // console.log(currentUser)
    
     try{
        const currentUser = req.user.userId
        console.log(currentUser);

        if(req.user){
            const getEventIdofJointUser =  await prisma.userFavourEvent.findMany({
                where: {
                    currentUser_id: currentUser
                }, 
            })

            const favoredEventsArr: any[] = []
            if(getEventIdofJointUser.length > 0){
                const promiseEventDataFetch = getEventIdofJointUser.map( async(selectedEvents: any) => {
                    const retrieveData = await prisma.event.findMany({
                       where: {
                        eventId: selectedEvents.event_id
                       }
                     })
                    favoredEventsArr.push(...retrieveData)
                }
                
                )

                await Promise.all(promiseEventDataFetch)
            }
            console.log(favoredEventsArr);
            res.json(favoredEventsArr)
        }

     }catch(error){
        console.log('Unexpected Error on server side for DisplayUserofJoinEvents handler ');
     }

}





export default{userFavorEventMobile, getUserFavoredEvents}