const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



exports.userFollowOtherUser = (req,res) => {
    
    const body = req.body
    console.log(body);

    res.status(200).json({message: "created connection to server"})


}