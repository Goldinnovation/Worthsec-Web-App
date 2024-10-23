// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()
import prisma from '../libs/prisma';
import { Request, Response } from 'express';
// const apicache = require('apicache');
// const cache = apicache.middleware;




interface AuthenticatedRequest extends Request {
    user?: any
}




export async function exploreEvents(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {

        // console.log(req);
        const currentUserId = req.user.userId
        if (currentUserId) {
          
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


            // const resInterestArr: any[] = []
            if (userInterestsdataArr) {

                const interestedEvents = await prisma.event.findMany({
                    where: {
                        eventType: {
                            in: userInterestsdataArr
                        }
                    },
                    take: 24   //setting query limit to 10
                });
                // console.log(interestedEvents.length);
                res.status(200).json(interestedEvents)
            }

                // Mapping over the list of the user Interest and querying all corresponding Events that match the Interest array

            //     const promise = userInterestsdataArr.map(async (currentUserInterestItem: any) => {
                  
            //         // console.log("captured Interest data", interestedEvents?.length);
            //         // const lenArr = interestedEvents?.length
            //         // lenArr.reduce((total, sum) => total += sum)
            //         if (interestedEvents?.length > 0) {

                       
            //             resInterestArr.push(...interestedEvents)
            //         }
            //     });

            //     await Promise.all(promise)
            // }


            // console.log(resInterestArr);





        }else{
            // console.log('trigger');
            res.status(400).json({message: "Invalid Request on exploreEvents handler function"})
        }
       

    } catch (error) {
        // console.log("Bad request:", error)
        res.status(400).json({message: "Invalid Request on exploreEvents handler function,  Cannot read properties of undefined"})

    }




}


export default { exploreEvents }