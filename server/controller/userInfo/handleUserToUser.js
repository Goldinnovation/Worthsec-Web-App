const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()



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


exports.searchUser_friends = async (req, res) => {

    const currentUser = req.user
    const otherUser_id = await req.params.id
    // console.log(" handlefunction - searchUser_friends:", otherUser_id)


    try {
        /**
         * responds with an object of length 1, if the current user is already following the other user
         * if the current user has no record with the other user it will return an object with length of 0 
         */
        if(currentUser && otherUser_id){
            const onConnectionexist = await prisma.userTouser.findMany({
                where: {
                    userRequested_id: currentUser.userId,
                    userFollowed: otherUser_id,
                }, 
                include: {
                    notification: {
                        select: {
                            notificationId: true
                        }
                    }
                }
            })
            console.log(onConnectionexist);
            res.status(200).json(onConnectionexist)
        }else{
            return res.status(500).json({message: "User could not be found"})
        }
        


    } catch (error) {
        console.log(error)
        return req.status(400).json({ message: "Bad request handler by searchUser_friends" })
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


exports.followUser = async (req, res) => {

    const currentUser = req.user
    const otherUser_id = req.body

    try {

        if (currentUser && otherUser_id) {
            // checks if the current user follows the other user,
            // if the condition is false, repesenting the length of 0 the database table will
            // create a nea record which represents the follow event
            const IfUserFriends = await prisma.userTouser.findMany({
                where: {
                    userRequested_id: currentUser.userId,
                    userFollowed: otherUser_id.userIdData

                }
            })
            if (IfUserFriends?.length === 0) {

                const createUserasFriend = await prisma.userTouser.create({
                    data: {
                        userRequested_id: currentUser.userId,
                        userFollowed: otherUser_id.userIdData,
                        connection_status: 1
                    }
                })
                        
                     

                if (createUserasFriend) {
                    const createotherUserNotification = await prisma.notification.create({
                        data: {
                            currentUser_notified_Id: currentUser.userId,
                            userTouser_connection_id: createUserasFriend.userTouserId
                        }
                    })
                    
                res.status(200).json({message: "currentUser follows now otherUser" })
                }

            } else {

                console.log("User followes already user")
                res.status(200).json({ message: "User followes already user" })

            }
        }
        else {

            return req.status(400).json({ message: "Error with getting currentUser and OtherUser" })
        }
    } catch (error) {
        console.log(error)
        return req.status(400).json({ message: "Bad UserToUser Request" })
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

exports.unFollowUser = async (req, res) => {

    const userConnection_id = req.body.unFollowUserId
    const otherUserNotification_Id = req.body.userNotificationId
    

    try {
        // deletes the connection of the users 
        if(userConnection_id && otherUserNotification_Id){
            console.log(userConnection_id);
            console.log(otherUserNotification_Id);
            const deleteNotification = await prisma.notification.delete({
                where: {
                    notificationId: otherUserNotification_Id
                }
            })
            console.log(deleteNotification)
            if(deleteNotification){
                const deleteUserconnection = await prisma.userTouser.delete({
                    where: {
        
                        userTouserId: userConnection_id
                    }
                })
                console.log("successful deleted")
                res.status(200).json({ message: "User unFollowed user" })
    
            }
        }
        
    } catch (error) {
        console.log(error)
        return req.status(400).json({ message: "Bad Request for unFollowUser handler" })

    }
}