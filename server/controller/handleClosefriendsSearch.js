const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()




exports.searchforClosefriends = async(req,res) => {
    const body = req.body.searchfriendsvalue
    // console.log("searchforClosefriends:",body);
    try{
        if(req.user && req.body){
            const searchforUser = await prisma.account.findUnique({
                where: {
                    userName: body
                }
            })

            // console.log(searchforUser)
            res.status(200).json(searchforUser)
        }

    }catch(error){
        res.status(200).json({message: " No request from current user",error})
    }
    

    
    
}




exports.searchImgUrl = async(req,res) =>{

    const body = req.params.id
    console.log("searchImgUrl", body);
    res.json({message: "Successful connection with searhImgUrl"})
}

