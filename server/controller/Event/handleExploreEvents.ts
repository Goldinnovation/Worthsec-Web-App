
import prisma from '../../libs/prisma';
import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { use } from 'passport';
import { as } from 'vitest/dist/chunks/reporters.WnPwkmgA';



interface AuthenticatedRequest extends Request {
    user?: any
    city?: any
}




export async function exploreEvents(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {
        const currentUserId = req.user.userId
         // const userCity = req.body.city


        if (!currentUserId) {
            res.status(400).json({ message: "Invalid Request from Client, user ID does not exist" })
        }
         // if (!userCity) {
        //     res.status(400).json({ message: "Invalid Request from Client, user City does not exist" })
        // }


    const getEventData = async () => {

            const getUserInterest = await prisma.account.findUnique({
                where: {
                    userId: currentUserId

                }, include: {
                    userInterest: {
                        select: {
                            interest_list: true
                        }
                    },
                    userTouser: {
                        select: {
                            userFollowed: true
                        },
                        take: 2
                    }


                }
            })

           
             if(getUserInterest){
                    processUserData(getUserInterest,  req, res)
            }
          

           
       
           
           
            

        }

       await getEventData()

    


    } catch (error) {
        console.log("Unexpected Server Error on exploreEvents function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" })

    }




}


export const processUserData = (userData: any, req: AuthenticatedRequest, res: Response) => {

    try{

        const userInterestsdataArr = userData?.userInterest?.interest_list
        const currentUserFriends = userData?.userTouser
        console.log("userInterestsdataArr", userInterestsdataArr);
        const userFriendsId: any = currentUserFriends?.map((prev: any) => prev?.userFollowed || [])
        console.log('userFriendsId', userFriendsId);
    
        if (userInterestsdataArr && userFriendsId.length > 0) {
            handlesUserFriendsInterest(userInterestsdataArr, userFriendsId, req, res)
        } else {
            handleSpecifiedEvent(userInterestsdataArr, req, res)
    
        }

    }catch(error){
        console.log("Unexpected Server Error on processUserData function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" })

    }

  
}


// This function queries the interests of the current user's friends and compares them with the current user's interests to add new, unique interests to the current user's interest data list 
export const handlesUserFriendsInterest = async(currentUserInterestData: string[]| undefined, currentUserFriendsId: any | undefined, req: AuthenticatedRequest, res: Response) => {

    try{

       
        
        const friendInterestcall =  async() => {
            const friendsInterestsData: any[] = []
            const otherUserInterestData = currentUserFriendsId.map(async(id: string) => {
                const interestData =  await prisma.account.findUnique({
                    where: {
                      userId: id
                    },
                    include: {
                        userInterest: {
                            select: {
                                interest_list: true
                            }
                        }
                    }
                })
    
    
                
                const otherUserInterest = interestData?.userInterest?.interest_list || [];
                friendsInterestsData.push(...otherUserInterest)
              })
    
            await Promise.all(otherUserInterestData)

            processFriendsInterestData(friendsInterestsData, currentUserInterestData, req, res)
    
            
          
        }
        await friendInterestcall()

    }catch(error){
        console.log("Unexpected Server Error on handleSpecifiedEvent function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" })

    }
}


export const processFriendsInterestData = async(friendsInterestsData: string[] , currentUserInterestData: any, req: Request, res: Response ) =>{

    const uniqueArr  = [... new Set(friendsInterestsData)]
    
    // comparing the currentUser Interests with the other user Interest and removing equal Interest 
    const comparingInterest = uniqueArr?.filter((interestString: string) => 
        !currentUserInterestData?.some((otherUserInterest: string) => otherUserInterest === interestString)
    )

    //  handles the default logic
    if(comparingInterest.length === 0 && currentUserInterestData ){
        console.log('default trigger');
        const defaultList = ["jazz", "Movie", "Art"]
        const updatedInterstDatabydefault = [...currentUserInterestData,...defaultList ]

        console.log('updatedInterstDatabydefault', updatedInterstDatabydefault);
        handleSpecifiedEvent(updatedInterstDatabydefault, req, res)
     
    }else{
          // create a list with 3 new unequal interest items
        const newInterestData = []
        let sum = 0
        
            for(const i of comparingInterest){
                if( sum < 3){
                    sum++
                    newInterestData.push(i)
                }  
            }
        

        
        
        if(newInterestData.length > 0 && currentUserInterestData){
            const updatedInterstData = [...currentUserInterestData, ...newInterestData]

        
            handleSpecifiedEvent(updatedInterstData, req, res)
         
        }
        


    }


}


//  handles the retrieve of conditional event datas 
export const handleSpecifiedEvent = async(data: string[] | undefined, req: AuthenticatedRequest, res: Response) => {

    try{
        const getspecifiedEvents = async() => {
            console.log('data:', data);
            const today = new Date()
            const endDate = new Date()
            endDate.setDate(today.getDate() + 7)
          

            try{
                const interestedEvents = await prisma.event.findMany({
                    where: {
                        // cityType: {
                        //     in: userCity 
                        // }, 
                        eventType: {
                            in: data
                        }, 
                        eventDate: {
                            gte: today,  
                            lte: endDate 
                        }, 
                    },
                    orderBy: {
                        eventDate: 'asc'
                    },
                    take: 24  
                });

                console.log('interestedEvents', interestedEvents);
                res.status(200).json(interestedEvents)

            }catch(error){
                console.log("Unexpected database query  error on getspecifiedEvents nested function, CatchBlock - True:", error)
                res.status(500).json({ message: "Unexpected Server Error on  getspecifiedEvents nested function" })
            }
          
        }
        getspecifiedEvents()
    }catch(error){
        console.log("Unexpected Server Error on handleSpecifiedEvent function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" })

    }
 
}



export default { exploreEvents }