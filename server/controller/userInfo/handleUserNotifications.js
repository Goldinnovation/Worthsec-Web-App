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
                  
                const otherUserRequest = checkNotifications[0].userTOuser.userRequested_id
                // console.log(otherUserRequest);
                if(otherUserRequest){
                    const getOtherUser = await prisma.account.findUnique({
                        where: {
                            userId: otherUserRequest,
                        }, include: {
                            picture: true
                        }
                    })

                    console.log(getOtherUser);
                    res.json([getOtherUser])
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