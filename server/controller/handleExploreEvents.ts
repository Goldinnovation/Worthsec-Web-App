import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';
// const apicache = require('apicache');
// const cache = apicache.middleware;




interface AuthenticatedRequest extends Request{
    user?: any
}




export async function exploreEvents(req: AuthenticatedRequest,res: Response): Promise<void> {


    // receives Json string from the query request 
    // const selectQueryString = req.query.selectedValues as string
    // console.log(selectQueryString)
    // parse the json string to an object 
    // const selctedQueryObject = JSON.parse(selectQueryString)
    // console.log(selctedQueryObject)
   

    // Converting the all 3 string to Numbers 
    // if none of the numbers are selceted the value will be undefined 

   

    // const selectedEventsTypeNum = parseInt(selctedQueryObject.explore_selectTypeofEvent__bmewZ, 10)
    // const selectedType = (selectedEventsTypeNum >=1 && selectedEventsTypeNum <=3 ? selectedEventsTypeNum : undefined)
    // // console.log(selectedType);

    // const inputNumber =  parseInt(selctedQueryObject.selectedRangeofEvents, 10)
    // const rangeEventNum = (inputNumber >= 9 && inputNumber <=20 ? inputNumber : undefined)
    // // console.log(rangeEventNum);

    // const inputCategoryNum  =  parseInt(selctedQueryObject.explore_selectTypeofEventCategory__KzDeU, 10)
    // const inviteNum = (inputCategoryNum >=1 && inputCategoryNum <=3 ? inputCategoryNum : undefined)

    // console.log(inviteNum)

    try{
        const currentUser = req.user.userId
         if(currentUser){

            console.log(currentUser);
            const getUserInterest = await prisma.account.findUnique({
                    where: {
                        userId: currentUser

                    },include: {
                        userInterest: { 
                            select: {
                                interest_list: true
                            }
                        }


                    }
            })

            const userInterestsdataArr = getUserInterest?.userInterest?.interest_list
          

            const resInterestArr: any[] = []
            if(userInterestsdataArr){
               
                const promise = userInterestsdataArr.map(async(currentUserInterestItem) => {
                    const interestedEvents = await prisma.event.findMany({
                        where: {
                            eventType: currentUserInterestItem
                        }
                    });

                    
                    if(interestedEvents?.length > 0){
                        resInterestArr.push(...interestedEvents)
                    }
                });

                await Promise.all(promise)
            }
            console.log(resInterestArr);
             res.status(200).json(resInterestArr)


           
           

         }

    }catch(error){
        console.log("Bad request:",error)
    }
    


}


export default {exploreEvents}