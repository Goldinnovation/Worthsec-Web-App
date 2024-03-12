const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()




exports.getUserNotification =  async (req,res) => {

    const user = req.user
   

    try{
        if(req.user){
            const trackNotification = await prisma.notification.findMany({
                where: {
                    currentUser_Id: user.userId
                }
            })
            console.log(trackNotification.length);
            res.json(trackNotification)
        }
    }catch(error){
        console.log(error)
        return req.status(400).json({ message: "Error on getUserNotification hanlderlogic", error})

    }
}