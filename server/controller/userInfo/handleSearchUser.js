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

    console.log('Received request:', req.method, req.url, req.params);

   const userParam = await req.params.id
   console.log(userParam)
    
    try{

        if(userParam){
           
            const userImage = await prisma.picture.findFirst({
                where: {
                    picture_owner_id: userParam
                }
            });
            console.log('init')
            console.log(userImage)
          res.json(userImage)
        }
        else{
            res.status(401).json({error: 'user could not be find'})
        }
        

    }catch(error){
        console.log('failed to connect to db')
        console.log(error)
        res.status(500).send('Error getting the Imagedata')
    }
    // res.json({message:"succesful"})
   

}

