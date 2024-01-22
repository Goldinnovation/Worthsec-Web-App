const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()




exports.searchUser_friends =  async(req,res) => {

        // console.log('Received request:', req.method, req.url, req.params);


    const userFriendsId =  await req.params.id
    // console.log(userId);

    try{
        const checkIfUserFriends = await prisma.userTouser.findMany({
            where: {
                userFollowed: userFriendsId
            }
        })

        // console.log(checkIfUserFriends.length)

        if(checkIfUserFriends.length !== 0){
        
            res.status(200).json({message:"User are connected as Friend"})
            
        }else{
            res.status(200).json({message:"User are not Friends"})
        }
       

    }catch(error){
        console.log(error)
        return req.status(400).json({message: "Bad request handler by searchUser_friends"})
    }



    // res.status(200).json({message: "created connection to server"})

}

exports.followUser = async(req,res) => {
    
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
        res.status(200).json({message: "User followed user"})

    }catch(error){
        console.log(error)
        return req.status(400).json({message: "Bad UserToUser Request"})

    }

    // res.status(200).json({message: "created connection to server"})


}