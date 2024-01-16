const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



// User can search for other user by typing his the username 
// the handlerlogic checks for the enterd user in the database table

exports.searchUserbyUser = async(req,res,next) => {

    const searchUserName =  req.body.searchValue
    // console.log(searchUserName)

    try{
        const searchUser =  await prisma.account.findMany({
            where: {

                userName: searchUserName
            }
        })
       
        // console.log(searchUser);
        console.log('connected to the db')
        // console.log(searchUser)
        
        res.status(200).json(searchUser)
        
     

    }catch(error){
        console.log(error)
        return res.status(400).json({message:"Could not find User", error})

    }
   
    
  
}



// After typing the user in the input the findUserprogilimage qill search for the user Profilimage 
//  in the database table picture  with id and return the specfific link to the image 

exports.findUserProfilimage = async(req,res) => {

    // console.log('Received request:', req.method, req.url, req.params);

   const userParam = await req.params.id
//    console.log(userParam)
    
    try{

        if(userParam){
           
            const userImage = await prisma.picture.findFirst({
                where: {
                    picture_owner_id: userParam
                }
            });
           
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
   

}

