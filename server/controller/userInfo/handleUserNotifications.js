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
                res.json({message: "User doesn't have any notifications"})
            }else{
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
                    // console.log(checkNotifications);
                    const followerId_arr = checkNotifications.map(connectId => connectId.userTOuser.userRequested_id)
                
                   
                  
                if(followerId_arr){

                    const checkConnection =  await prisma.userTouser.findMany({
                        where: {
                            userRequested_id:currentUser.userId, 
                            userFollowed: {
                                in: followerId_arr
                            }
                        }
                    })
                    const otheruserId = checkConnection.map(otheruserId => otheruserId.userFollowed)

                    const checkotherConnection =  await prisma.userTouser.findMany({
                        where: {
                            userRequested_id: {in: otheruserId},
                            userFollowed: currentUser.userId
                        }
                    })

                    console.log(checkotherConnection);


                    const userconnectionId = checkConnection.map( connectionId => connectionId.userTouserId)
                    const otherUserconnectionId = checkotherConnection.map( otherConnecitonId => otherConnecitonId.userTouserId)
                    console.log(otherUserconnectionId);
    
                    if(checkConnection){

                        const updateConnectionStatus1 = await prisma.userTouser.updateMany({
                            where: {
                                userTouserId: { in: userconnectionId}
                            }, 
                            data: {
                                userRequested_id:currentUser.userId,
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

                    console.log(getOtherUser);
                    res.json(getOtherUser)
                }
                    
            
            }


         
            
        }else{
            res.json({message: "User doesn't have any notifications"})
        }
    } catch (error) {
        console.log(error)
        return req.status(400).json({ message: "Error on getUserNotification hanlderlogic", error })

    }
}