const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()




exports.getUserNotification = async (req, res) => {

    const currentUser = req.user


    try {
        if (req.user) {
            const trackNotification = await prisma.notification.findMany({
                where: {
                    currentUser_notified_Id: currentUser.userId
                }
            })
            console.log(trackNotification.length);
            res.json(trackNotification)
        }
    } catch (error) {
        console.log(error)
        return req.status(400).json({ message: "Error on getUserNotification hanlderlogic", error })

    }
}