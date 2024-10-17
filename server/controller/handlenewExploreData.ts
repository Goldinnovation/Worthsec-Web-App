import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';
// const apicache = require('apicache');
// const cache = apicache.middleware;



interface eventProps {
    eventId: string | null;
    eventHost: string | null;
     eventHostName: string | null;
    eventTitle: string | null;
    eventDate: Date;
    eventType: string | null;
    eventDescriptionContent: string | null;
    eventTime: string | null;
    ImageCoverUpload: string | null;
    eventInviteType: number | null;
    eventAddress: string | null;
    eventZipcode: string | null;
    cityType: string | null;
    selectedRangeofEvents: number | null;
  }




interface AuthenticatedRequest extends Request {
    user?: any
    decodedUserId: any

}




export async function updatetoNewEventData(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as AuthenticatedRequest)?.decodedUserId;
        const eventDataArr = req.body?.EventDataId;
        const eventDataLen = eventDataArr.length;
        console.log(eventDataLen);
        eventDataLen == 30 ?
          (async () => {
                const newEventData = await prisma.event.findMany({
                  where: {
                    eventId: {
                      notIn: eventDataArr,
                    },
                  },
                  take: 10,
                });
                // Adds new Data to the list
                  res.status(200).json(newEventData)
                console.log('isideCall', newEventData);
            
          })():

           res.status(500).json({message: "Invalid Request on getNewEventData handler Function, Processing new event data "})


    


     

    } catch (error) {
        console.log("Server Error on getNewEventData handler function, CatchBlock - True:", error)
    }



    // res.status(200).json({message: "connected"})
}





export default {  updatetoNewEventData }