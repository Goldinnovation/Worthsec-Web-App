const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()


exports.userFavorEvent = async(req,res) => {

    const favor_user_id = req.user.userId
    console.log(favor_user_id)
    const favor_event_id = req.body.favoreventId
    console.log(favor_event_id)

    try{
        if(req.user && req.body){

            const userfavoredEvent =  await prisma.userFavorEvent.create({ data:
            {
                user_id:  favor_user_id,
                event_id: favor_event_id
            }})

            console.log(userfavoredEvent)
            res.status(200).json({message:"user successfully favored a event"})
        }

    }catch(error){
        console.log('Error on server side:', error)
        res.status(500).json({message: "Unexpected Error on serverside"})

    }

}



