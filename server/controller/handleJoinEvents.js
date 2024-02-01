const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



exports.userJoinEvent = async(req,res) => {

    const joined_user_id = req.user.userId
    console.log(joined_user_id)
    const joined_event_id = req.body.joinEventId
    console.log(joined_event_id)

    try{
        if(req.user && req.body){

            const joinusertoEvent =  await prisma.userJoinEvent.create({ data:
            {
                user_id:  joined_user_id,
                event_id: joined_event_id
            }})

            // console.log(joinusertoEvent)
            res.status(200).json({message:"user successfully favored a event"})
        }

    }catch(error){
        console.log('Error on server side:', error)
        res.status(500).json({message: "Unexpected Error on serverside"})

    }

}