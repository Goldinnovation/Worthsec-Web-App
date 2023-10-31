const {PrismaClient} = require('@prisma/client');
const passport = require('passport')





exports.userlog = (req,res,next) => {
    console.log(req.body)

    

   console.log(req.user)

    res.json({message: "Login Successful"})

}