const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()




exports.searchforClosefriends = (req,res) => {
    
    const body = req.body 
    console.log(body);

    
    res.json({message: "successful connected"})
}