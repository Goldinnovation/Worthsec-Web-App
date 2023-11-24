const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()






exports.userProfilImage = async(req,res) => {

    const user = req.user 
    console.log(user)
    const body =  req.file

    console.log(body)


    const pictureData = {
        pictureUrl: req.file.filename,
        picture_owner_id: req.user.userId
    }

    console.log(pictureData.pictureUrl)
    console.log(pictureData.picture_owner_id)

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
    }

    catch(error){
        console.log(error)

    } 
    // finally {
    //     await prisma.$disconnect();
    // }


    
   


}