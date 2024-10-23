import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';
// const apicache = require('apicache');
// const cache = apicache.middleware;




interface AuthenticatedRequest extends Request {
    user?: any
}




export async function exploreEvents(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {
        const currentUserId = req.user.userId
        // console.log(currentUser);
        // console.log(req.user);

        // finds the interest of the currentUser 
        // let sum = 0
        if (currentUserId) {
            // const num = sum+=1
            // console.log(num);
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





        }
       

    } catch (error) {
        console.log("Bad request:", error)
    }




}


export default { exploreEvents }