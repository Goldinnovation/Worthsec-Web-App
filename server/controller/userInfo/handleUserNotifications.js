const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()




exports.getUserNotification = async (req, res) => {

    const currentUser = req.user


    try {
        if (currentUser) {
           
            const trackNotification = await prisma.notification.findMany({
                  where: {
                        currentUser_notified_Id: currentUser.userId
                }, 

            }) 

            // console.log(trackNotification.length);
            if(trackNotification.length === 0){
                res.status(200).json({message: "User does not have any notifications"})
            }else{
                // retrieves the currentuser related record from the notification database table and requested user id from the userTouser table 
                // represents all users that follow the currentUser
                const checkNotifications = await prisma.notification.findMany({
                        where: {
                            currentUser_notified_Id: currentUser.userId
                        }, include: {
                            userTOuser: {
                                select: {
                                    userRequested_id: true
                                }
                            }
                        }
                    })
                    const followerId_arr = checkNotifications.map(connectId => connectId.userTOuser.userRequested_id)
                
                   
                //   Takes the requested user id to check if the currentUser follows the other user
                //  represents filters users that the currentUser on follow 
                if(followerId_arr){

                    const checkConnection =  await prisma.userTouser.findMany({
                        where: {
                            userRequested_id:currentUser.userId, 
                            userFollowed: {
                                in: followerId_arr
                            }
                        }
                    })
                    // console.log(checkConnection.length);
                    if(checkConnection.length > 0){
                                // represents an array of the otheruserIds that the currentuser Follows 
                            const otheruserId = checkConnection.map(otheruserId => otheruserId.userFollowed)

                            const checkotherConnection =  await prisma.userTouser.findMany({
                                where: {
                                    userRequested_id: {in: otheruserId},
                                    userFollowed: currentUser.userId
                                }
                            })

                        

                            // represents the pk id for the currentUser relation to otherusers 
                            const userconnectionId = checkConnection.map( connectionId => connectionId.userTouserId)

                            // represents the pk id for the otheruser relation to the currentUser
                            const otherUserconnectionId = checkotherConnection.map( otherConnecitonId => otherConnecitonId.userTouserId)

                            // represents update function for both connection status 
                            if(userconnectionId && otherUserconnectionId){

                                const updateConnectionStatus1 = await prisma.userTouser.updateMany({
                                    where: {
                                        userTouserId: { in: userconnectionId}
                                    }, 
                                    data: {
                                        
                                        connection_status: 2
                                    }
                                })
                                if(updateConnectionStatus1){
                                    const updateStausConnection2 = await prisma.userTouser.updateMany({
                                        where: {
                                            userTouserId: { in: otherUserconnectionId}
                                        }, 
                                        data: {
                                        
                                            connection_status: 2
                                        }
                                    })
                                }
                            
                            }
                    }
                    

                    // console.log(checkConnectionStatus);
                    const getOtherUser = await prisma.account.findMany({
                        where: {
                            userId: {
                                in: followerId_arr
                            },
                        }, include: {
                            picture: true
                        }
                    })

                    // console.log(getOtherUser);
                    res.json(getOtherUser)
                }
                    
            
            }


         
            
        }else{
            res.status(4000).json({message: "Client Error - currentUser is not available"})
        }
    } catch (error) {
        console.log(error)
        return req.status(400).json({ message: "Error on getUserNotification hanlderlogic", error })

    }
}