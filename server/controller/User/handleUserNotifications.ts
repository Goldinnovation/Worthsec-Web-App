import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { Request, Response } from "express"


interface AuthenticatedRequest extends Request {
    user?: any
}



export async function getUserNotification(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {
        const currentUserId = req.user.userId

        if (!currentUserId) {
            res.status(200).json({ message: "Bad request - currentUserId is required" })
        }


        const trackNotification = await prisma.notification.findMany({
            where: {
                currentUser_notified_Id: currentUserId
            },

        })

        if (trackNotification.length === 0) {
            res.status(200).json({ message: "User does not have any notifications" })
        } else {
            handleUserNotifications(currentUserId, req, res)
        }


    } catch (error) {
        console.log("Server Error on getUserNotification handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}




const handleUserNotifications = async (currentUserId: string, req: AuthenticatedRequest, res: Response) => {


 try{
    const checkNotifications = await prisma.notification.findMany({
        where: {
            currentUser_notified_Id: currentUserId
        }, include: {
            userTOuser: {
                select: {
                    userRequested_id: true
                }
            }
        }
    })
    const followedId = checkNotifications.map((connectId: any) => connectId.userTOuser.userRequested_id)
    handleNotificationOfUserTypeFollow(currentUserId, followedId,req, res)

 }catch(error){

    console.log("Server Error on handleUserNotifications handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });

 }
}








    //   Takes the requested user id to check if the currentUser follows the other user
    //  represents filters users that the currentUser on follow 
   

const handleNotificationOfUserTypeFollow = async(currentUserId: any,followedId: string[], req: AuthenticatedRequest, res: Response ) => {

  
    try{
        const checkConnection = await prisma.userTouser.findMany({
            where: {
                userRequested_id: currentUserId,
                userFollowed: {
                    in: followedId
                }
            }
        })
        
        if (checkConnection.length > 0) {
            const otheruserId = checkConnection.map((otheruserId: any) => otheruserId.userFollowed)

            const checkotherConnection = await prisma.userTouser.findMany({
                where: {
                    userRequested_id: { in: otheruserId },
                    userFollowed: currentUserId
                }
            })

            handleUpdateConnectionState( followedId, checkConnection, checkotherConnection, req, res )
        }else{
            const getOtherUser = await prisma.account.findMany({
                where: {
                    userId: {
                        in: followedId
                    },
                }, include: {
                    picture: true
                }
            })
    
            res.json(getOtherUser)
        

        }

    }catch(error){

        console.log("Server Error on handleNotificationUserFollow handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    
    }

       

        
}


const handleUpdateConnectionState = async(followedId:string[], checkConnection: any, checkotherConnection: any, req: AuthenticatedRequest, res: Response  ) => {

    try{
        
      // represents the pk id for the currentUser relation to otherusers 
      const userconnectionId = checkConnection.map((connectionId: any) => connectionId.userTouserId)

      // represents the pk id for the otheruser relation to the currentUser
      const otherUserconnectionId = checkotherConnection.map((otherConnecitonId: any) => otherConnecitonId.userTouserId)

      // represents update function for both connection status 


      const updateConnectionState = async() =>{
        await prisma.userTouser.updateMany({
            where: {
                userTouserId: { in: userconnectionId }
            },
            data: {

                connection_status: 2
            }
        })
        
      await prisma.userTouser.updateMany({
                where: {
                    userTouserId: { in: otherUserconnectionId }
                },
                data: {

                    connection_status: 2
                }
            })
      

      }

       updateConnectionState()

      const getOtherUser = await prisma.account.findMany({
        where: {
            userId: {
                in: followedId
            },
        }, include: {
            picture: true
        }
    })

    res.json(getOtherUser)


   

    }catch(error){
        console.log("Server Error on handleUpdateConnectionState handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }


    
}

export default { getUserNotification }