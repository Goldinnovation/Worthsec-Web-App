const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



exports.DisplayUserofJoinEvents = async(req,res) => {
    const user = req.user.userId
    // console.log(user)
     const body = req.body 
    //  console.log(body);

     try{
        if(req.user){
            const getEventIdofJointUser =  await prisma.userJoinEvent.findMany({
                where: {
                    user_id: user
                }
            })
            // console.log(getEventIdofJointUser)
            res.status(200).json(getEventIdofJointUser)
        }

     }catch(error){
        console.log('Unexpected Error on server side for DisplayUserofJoinEvents handler ');
     }



    //  res.json({message: "Connected to backend of DisplayUserofJoinEvents"})
}




exports.DisplaygetEventbyjoinId = async(req,res) => {

    const body = req.body
    
    console.log(body.eventid);



    try{
        if(req.user && body){

            
            const eventData = await prisma.eventPrompt.findMany({
                where:{
                    id: {
                        in: body.eventid
                    }
                    
                }
            })


            // console.log(eventData.length)
            // console.log(eventData);
            res.status(200).json(eventData)

        }

    }catch(error){
        console.log('Failed the handler logic on DisplaygetEventbyjoinId ')
    }

}