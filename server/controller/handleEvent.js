const {PrismaClient} = require('@prisma/client');
const { all } = require('axios');




const prisma = new PrismaClient()


exports.findEvents = async(req,res) => {
  

    
    try{
        if(req.user){
            const userEvents =  await prisma.eventPrompt.findMany({
                where: {
                    eventHost: req.user.userId
                }
            });

            res.json(userEvents);
        }else {
            res.status(401).json({error: 'user is not Authenticated to get events'})
        }

    }catch(error){
        console.error(error)
        res.status(500).send('Error with find Event logic  ')
    }
   


    
    

}


exports.deleteEvent = async(req,res) => {
    const id = req.params.id;
    console.log(id)


    const deletedEvent = await prisma.eventPrompt.delete({
        where: {id: id},
    })

    res.json(deletedEvent)
}


exports.createEvent = async(req,res) => {
  
//   console.log(req.body)
//    console.log(req.user)

    const stringEventType = req.body.eventType
    IntEventType = parseInt(stringEventType, 10)
    
    const userId = req.user.userId
  
    
    const newEventBody = {
        ...req.body, 
        ImageCoverUpload: req.file.filename,
        eventType: IntEventType,
        eventHost: userId,
        
    }


    
    // console.log('test')
    try {
        const newCreateEvent = await prisma.eventPrompt.create({ data: newEventBody});
        console.log(newCreateEvent)

        
    } catch (error) {
        console.error(error)
        res.status(500).send('issue server side')
    }
    res.json(newEventBody)
}