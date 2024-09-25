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
        const currentUser = req.user.userId
        // console.log(currentUser);
        console.log(req.user);

        // finds the interest of the currentUser 
        if (currentUser) {
            console.log('init');

            // console.log(currentUser);
            const getUserInterest = await prisma.account.findUnique({
                where: {
                    userId: currentUser

                }, include: {
                    userInterest: {
                        select: {
                            interest_list: true
                        }
                    }


                }
            })

            const userInterestsdataArr = getUserInterest?.userInterest?.interest_list


            const resInterestArr: any[] = []
            if (userInterestsdataArr) {

                const promise = userInterestsdataArr.map(async (currentUserInterestItem) => {
                    const interestedEvents = await prisma.event.findMany({
                        where: {
                            eventType: currentUserInterestItem
                        },
                    });


                    if (interestedEvents?.length > 0) {

                        // const eventHostId= interestedEvents.map((host) => host.eventHost)
                        // console.log(eventHostId);
                        // if(eventHostId.length > 0 ){
                        //     const getAccount =eventHostId.map(async(id) =>{
                        //         const acc = await prisma.account.findUnique({
                        //             where:{
                        //                 userId: id
                        //             },include:{
                        //                 picture: {
                        //                     select: {
                        //                         pictureUrl: true
                        //                     }
                        //                 }
                        //             }
                        //         })

                        //         console.log(acc);

                        //     })

                        //     await Promise.all(getAccount);


                        // }


                        // console.log(interestedEvents);
                        resInterestArr.push(...interestedEvents)
                    }
                });

                await Promise.all(promise)
            }


            // console.log(resInterestArr);
            res.status(200).json(resInterestArr)





        }

    } catch (error) {
        console.log("Bad request:", error)
    }



}


export default { exploreEvents }