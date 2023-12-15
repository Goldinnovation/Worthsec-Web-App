const {PrismaClient} = require('@prisma/client');
const { default: next } = require('next');
const { redirect } = require('next/dist/server/api-utils');
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







// exports.getUserbyUser = async(req,res,next) => {

//     const searchUserName =  req.body.searchValue
//     console.log(searchUserName)

//     // try{
//     //     const searchUser =  await prisma.account.findMany({
//     //         where: {

//     //             userName: searchUserName
//     //         }
//     //     })
       
//     //     console.log('connected to the db')
//     //     console.log(searchUser)
//     //     res.status(200).json(searchUser)


//     // }catch(error){
//     //     console.log(error)
//     //     return res.status(400).json({message:"Could not find User", error})

//     // }
//     // finally{
//     //     console.log('reached')
//     //     next()
//     // }
    
   
//  next()
    

// }






exports.postUserbyUser = async(req,res,next) => {

    const searchUserName =  req.body.searchValue
    console.log(searchUserName)

    try{
        const searchUser =  await prisma.account.findMany({
            where: {

                userName: searchUserName
            }
        })
       
        console.log('connected to the db')
        // console.log(searchUser)
        
        res.status(200).json(searchUser)
        
     

    }catch(error){
        console.log(error)
        return res.status(400).json({message:"Could not find User", error})

    }
   
    
  
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






















exports.userProfilImage = async(req,res, next) => {
  
    console.log('knock knock');

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

        console.log('reached 2 ');
        next()
       
    }
    catch(error){
        console.log(error)

    } 
    


}