const {PrismaClient} = require('@prisma/client');





exports.userProfilImage = (req,res) => {

    const body =  req.file

    console.log(body)

    res.json({message:'successful send'})

}