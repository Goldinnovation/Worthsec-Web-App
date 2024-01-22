const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



exports.userToUser = async(req,res) => {
    
    const user = req.user
    console.log(user);
    const body = req.body
    console.log(body);
    try{

        const createUserasFriend = await prisma.userTouser.create({
            data:{
                userRequested_id: user.userId, 
                userFollowed: body.userIdData,
                userStatus: 1
            }
        })
        console.log(createUserasFriend)
        res.status(200).json(createUserasFriend)

    }catch(error){
        console.log(error)
        return req.status(400).json({message: "Bad UserToUser Request"})

    }

    // res.status(200).json({message: "created connection to server"})


}