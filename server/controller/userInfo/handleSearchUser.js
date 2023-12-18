const {PrismaClient} = require('@prisma/client');
// const { default: next } = require('next');
// const { redirect } = require('next/dist/server/api-utils');
const prisma = new PrismaClient()





exports.searchUserbyUser = async(req,res,next) => {

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




exports.findUserProfilimage = async(req,res) => {

   const body = await req.params.id
   console.log(body)
    
    // try{
    //     if(req.user){
           
    //         const userImage = await prisma.picture.findFirst({
    //             where: {
    //                 picture_owner_id: req.user.userId
    //             }
    //         });
    //       res.json(userImage)
    //     }
    //     else{
    //         res.status(401).json({error: 'user could not be find'})
    //     }
        

    // }catch(error){
    //     console.log(error)
    //     res.status(500).send('Error getting the Imagedata')
    // }
   

}

