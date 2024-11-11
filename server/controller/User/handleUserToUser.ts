import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { Request, Response } from "express"


/** 
 * Purpose Statement--searchUser_friends
 * 
 *  The searchUser_friends handler logic  retrieves information from the userTouser database table,
 * to determine if there is connection between two users. If the connection is found, it returns
 * a user object, allowing the API to update the corresponding user's button option  
*/



/**
 * Function Signature--searchUser_friends
 * 
 * @param {string} currentUser - The ID of the current user online.
 * @param {string} otherUser - The ID of the user to check for a connection
 * @returns {object|null} Returns a user object if the ID's are corresponding, otherwise it returns null.
 */


interface AuthenticatedRequest extends Request{
    user?: any
}


/**
         * responds with an object of length 1, if the current user is already following the other user
         * if the current user has no record with the other user it will return an object with length of 0 
         */

export async function searchUser_friends (req: AuthenticatedRequest, res: Response): Promise<void>{
    try {
        const currentUserId = req.user.userId
        const otherUserId = await req.params.id

        if (currentUserId) {
            res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
            return;
        }

        if (otherUserId) {
            res.status(400).json({ message: 'Invalid Request, otherUserId is required' });
            return;
        }

        const checksIfUsersAreFriends = await prisma.userTouser.findMany({
            where: {
                userRequested_id: currentUserId,
                userFollowed: otherUserId,
            },
            include: {
                notification: {
                    select: {
                        notificationId: true
                    }
                }
            }
        })
        res.status(200).json(checksIfUsersAreFriends)

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Bad request handler by searchUser_friends" })
    }

}

// -------------------------------------------------------------------------------------------------------------------------







/**
 * Purpose Statement--followUser
 * 
 * The followUser handler logic creates a record of the usersID and their status in the userTouser database table,
 * if the currentUser presses the button follow, the handler logic will asign the currentUser
 * to the column userRequested_id and the otherUserId will be assigned to userFollowed column. 
 * Afterwarda the status  which represents their relation will be updated from null to 1
 */

/**
 * Function Signature--followUser
 * 
 * @param {currentUser} - The ID of the current user who send a request 
 * @param {otherUser_id} - The ID of the other user who should be followed 
 * @returns {object|null} - Returns a object as the connection between both users 
 */


export async function followUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const currentUserId = req.user.userId
        const otherUserId = req.body.userIdData

        if (currentUserId) {
            res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
            return;
        }

        if (otherUserId) {
            res.status(400).json({ message: 'Invalid Request, otherUserId is required' });
            return;
        }

        const userFriendState = await prisma.userTouser.findMany({
            where: {
                userRequested_id: currentUserId,
                userFollowed: otherUserId

            }
        })

        checksIfUserFollowEachOther(userFriendState, req, res)



    } catch (error) {
        console.log("Server Error on followUser handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}





const checksIfUserFollowEachOther = async (userFriendState: any, req: AuthenticatedRequest, res: Response) => {

    try {
        const currentUserId = req.user.userId
        const otherUserId = req.body.userIdData


        if (userFriendState?.length > 0) {
            res.status(200).json({ message: "Current user follows already other user" })
        }

        const createUserasFriend = await prisma.userTouser.create({
            data: {
                userRequested_id: currentUserId,
                userFollowed: otherUserId,
                connection_status: 1
            }
        })

        await prisma.notification.create({
            data: {
                currentUser_notified_Id: otherUserId,
                userTouser_connection_id: createUserasFriend.userTouserId
            }
        })

        res.status(200).json({ message: "currentUser follows now other user"})


    } catch (error) {
        console.log("Server Error on checksIfUserFollowEachOther handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }


}








// -------------------------------------------------------------------------------------------------------------------------


/**
 * Purpose Statement--unFollowUser
 * 
 * The unFollowUser handler logic destroys the UserIDs corresponding record on the database table userTouser,
 * afterwards it responds with a json message which will update the state of the button on client side.
 * 
 */

/**
 * Function Signature--unFollowUser
 * 
 * @param {userConnection_id} - The userTOuser record id will be used to delete the record
 * @returns {object-message|null}
 */

export async  function unFollowUser  (req: AuthenticatedRequest, res: Response): Promise<void> {
    try {

    const userConnectionId = req.body.unFollowUserId
    const notificationId = req.body.userNotificationId

    if (!userConnectionId) {
        res.status(200).json({ message: "Bad request - unfollowedUserId is invalid" })
    }
    if (!notificationId) {
        res.status(200).json({ message: "Bad request - userNotificationId is invalid" })
    }
      
    await prisma.notification.delete({
                where: {
                    notificationId: notificationId
                }
            })
          
    deleteUserConnection(userConnectionId, req, res)

    } catch (error) {
        console.log("Server Error on unFollowUser handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });

    }
}




const deleteUserConnection =  async(userConnectionId: string,req: AuthenticatedRequest, res: Response) => {

    try { 
        await prisma.userTouser.delete({
            where: {

                userTouserId: userConnectionId
            }
        })
    
    res.status(200).json({ message: "User unFollowed user" })

    }
    catch(error){
        console.log("Server Error on deleteUserConnection handler function, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }

   
}


export default {unFollowUser, followUser, searchUser_friends}