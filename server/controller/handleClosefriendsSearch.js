const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()




exports.searchforClosefriends = async(req,res) => {

    const currentUser = req.user.userId
    // console.log(currentUser);
    const body = req.body.searchfriendsvalue
    console.log("searchforClosefriends:",body);
    try{
        if(currentUser && body){
            console.log("sass")
            const searchforUser = await prisma.account.findUnique({
                where: {
                    userName: body
                }
            })

            if(searchforUser) {
                try {
                    console.timeEnd('prismaQuery');
                    const closefriendsconnection = await prisma.userTouser.findMany({
                        where: {
                            userRequested_id: currentUser,
                            userFollowed: searchforUser.userId,
                            userStatus: 2
                        },
                    });
                    console.timeEnd('prismaQuery');
                    // console.log(closefriendsconnection);
                    res.status(200).json(closefriendsconnection);
                } catch (error) {
                    console.error('Error executing Prisma query:', error);
                    // res.status(500).json(null);
                }
            }else{
                res.json({message: "user could not be found"})
            }
            
        }

    }catch(error){
        res.status(200).json({message: " No request from current user",error})
    }
    

    
    
}




exports.searchImgUrl = async(req,res) =>{

    const otherUserId = req.params.id
    // console.log("searchImgUrl", otherUserId);

    try{
        if(req.user && otherUserId){
            const userImgurl = await prisma.picture.findUnique({
                where: {
                    picture_owner_id: otherUserId
                }

            })

            // console.log(userImgurl)
            res.status(200).json(userImgurl)
        }
        
    }catch(error){
        res.json({message: "Invalid request to searchImgUrl handler"})
    }
    
}

