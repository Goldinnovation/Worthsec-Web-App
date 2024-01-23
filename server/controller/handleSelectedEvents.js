const {PrismaClient} = require('@prisma/client');




exports.AllWorldwideEvents = async(req,res) => {
    
    const body = req.body 
    console.log(body);
    try{

    }catch(error){
        
    }
    res.json({message: "Successful Enterend the server handler "})


}