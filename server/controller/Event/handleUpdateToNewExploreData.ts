import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';





/**
 * Purpose Statement-- updatetoNewEventData
 * The handler function receives an array of event IDs and checks for other IDs that do not match those.
*/


/**
 * Function Signature--userFavourEvent
 * @param {string} userId - The value represents the current user ID.
 * @param {string} eventDataIds - The value represents the a list of event IDs.
 * @returns {string} Returns a list of Events that matches the requirements 
*/



interface AuthenticatedRequest extends Request {
  user?: any
  decodedUserId: any

}




export async function updatetoNewEventData(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as AuthenticatedRequest)?.decodedUserId;
        const eventDataIds = req.body?.EventDataId;

        if(!userId) {
          res.status(400).json({ message: 'Invalid Request, userId does not exist' });
        }

   
        if( !eventDataIds ||  eventDataIds.length !== 24 ) {
          res.status(400).json({ message: 'User Length does not match the requirements' });
        }


        // Function fetches new event data
        const fetchNewEventData = async() => {
          try{
            const newEventData = await prisma.event.findMany({
              where: {
                eventId: {
                  notIn: eventDataIds,
                },
              },
              take: 27,
            });
         
              res.status(200).json(newEventData)

          }catch(error){

           
            console.error("Error on fetching new event data, CatchBlock - True:", error);
            res.status(500).json({ message: "Failed to fetch new event data", Error: error });
          }}

        await fetchNewEventData()

    } catch (error) {
        console.log("Server Error on updatetoNewEventData handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Unexpected error Internal Server Error" });
    }

}





export default {  updatetoNewEventData }