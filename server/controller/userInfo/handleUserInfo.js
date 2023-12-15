const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()







exports.getUserProfilimage = async(req,res) => {

   
    
    try{
        if(req.user){
           
            const userImage = await prisma.picture.findFirst({
                where: {
                    picture_owner_id: req.user.userId
                }
            });
          
           
          res.json(userImage)
            
        }
        else{
            res.status(401).json({error: 'user could not be find'})
        }
        

    }catch(error){
        console.log(error)
        res.status(500).send('Error getting the Imagedata')
    }

}





exports.getUserbyUser = async(req,res) => {

    const searchUserName = await req.body.searchValue
    console.log(searchUserName)

    try{

        if(!req.body){
            res.status(404).json({Error: "User could not be found "})

        }else{

            try{
                const searchUser =  await prisma.account.findMany({
                    where: {

                        userName: searchUserName
                    }
                })
                // console.log('connected to the db')d
                console.log(searchUser)
                // return res.status(200).json(searchUser)
                next()

            }catch(error){
                res.status(400).json({message:"Could not find User"})
            }
            
            



        }
    }catch(error){

        next()
        res.status(500).json({message: "Fetch error of User by User", error})

    }
    // res.json({message: "connected"})
    
}













exports.deleteUserProfilImage = async(req,res) => {
    

    try{
        if(req.user){
            const deleleProfPic = await prisma.picture.delete({
                where:{
                    picture_owner_id: req.params.id
                }
            })
            res.json(deleleProfPic)
            
        }

       

    }catch(error){
        console.log('Catch ERROR on DELETE')
        res.status(500).send('CATCH DELETE REQ ERROR')
    }
   
    
  
}






















exports.userProfilImage = async(req,res) => {

    



    const pictureData = {
        pictureUrl: req.file.filename,
        picture_owner_id: req.user.userId
    }

    // console.log(pictureData.pictureUrl)
    // console.log(pictureData.picture_owner_id)

    try{
        const exitPic = await prisma.picture.findUnique({
            where: {picture_owner_id: req.user.userId}
        })
       

        if(exitPic){
           
            const updatePic =  await prisma.picture.update({
                where: {picture_owner_id: req.user.userId
                }, 
                data: {
                    pictureUrl: pictureData.pictureUrl
                },

            })
            console.log('updated picture')
           
            res.json({updatePic})
           
        }else {

            const createPic = await prisma.picture.create({
                data: pictureData
            })

            console.log('new picture created')
            res.json({createPic})
        }
        next();
    }
    catch(error){
        console.log(error)

    } 
  


    // finally {
    //     await prisma.$disconnect();
    // }


    
   


}