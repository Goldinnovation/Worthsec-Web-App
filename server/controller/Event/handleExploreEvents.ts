
import prisma from '../../libs/prisma';
import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';



interface AuthenticatedRequest extends Request {
    user?: any
    city?: any
}




export async function exploreEvents(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {
        const currentUserId = req.user.userId
        const userCity = req.body.city

        // represents the data of today
        const today = new Date()
        // represents the date in 7 days
        const endDate = new Date()
        endDate.setDate(today.getDate() + 7)

      

        if(!currentUserId){
            res.status(400).json({message: "Invalid Request from Client, user ID does not exist"})
        }


        const getEventData = async() => {

            const getUserInterest = await prisma.account.findUnique({
                where: {
                    userId: currentUserId

                }, include: {
                    userInterest: {
                        select: {
                            interest_list: true
                        }
                    }


                }
            })

            const userInterestsdataArr = getUserInterest?.userInterest?.interest_list


          
            if (userInterestsdataArr) {

                const interestedEvents = await prisma.event.findMany({
                    where: {
                        cityType: {
                            in: userCity //represents current city of the user
                        }, 
                        eventType: {
                            in: userInterestsdataArr
                        }, 
                        eventDate: {
                            gte: today,  //represents the date of today
                            lte: endDate //represents the dates between today and end Date
                        }, 
                    },
                    orderBy: {
                        eventDate: 'asc'
                    },
                    take: 24   //setting query limit to 10
                });
                // console.log(interestedEvents.length);
                res.status(200).json(interestedEvents)
            }

        }

        await getEventData()
          
          
 
       

    } catch (error) {
        console.log("Unexpected Server Error on exploreEvents function, CatchBlock - True:", error)
        res.status(500).json({message: "Unexpected Server Error on exploreEvents function"})

    }




}



export default { exploreEvents }