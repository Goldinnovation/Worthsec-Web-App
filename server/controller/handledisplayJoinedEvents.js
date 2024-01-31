const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



exports.DisplayUserofJoinEvents = (req,res) => {
     const body = req.body 
     console.log(body);



     res.json({message: "Connected to backend of DisplayUserofJoinEvents"})
}