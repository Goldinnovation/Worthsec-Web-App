const {PrismaClient} = require('@prisma/client');
const passport = require('passport')



exports.userFavorEvent = async(req,res) => {

    const body = req.body
    console.log(body)
    res.json({message: "User connect to favor backend"})

}