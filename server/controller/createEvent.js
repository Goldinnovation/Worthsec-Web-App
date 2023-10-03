const {PrismaClient} = require('@prisma/client');
const { all } = require('axios');




const prisma = new PrismaClient()


exports.findEvents = async(req,res) => {

    const allEvents =  await prisma.eventPrompt.findMany();

    
    res.json(allEvents);

}



exports.createEvent = async(req,res) => {
  
  
    

    const stringEventType = req.body.eventType
    IntEventType = parseInt(stringEventType, 10)
    

    
    const newEventBody = {
        ...req.body, 
        ImageCoverUpload: req.file.filename,
        eventType: IntEventType
    }
    
    // console.log('test')
    try {
        const newCreateEvent = await prisma.eventPrompt.create({ data: newEventBody});
        // console.log(newCreateEvent)

        
    } catch (error) {
        console.error(error)
        res.status(500).send('issue server side')
    }
    res.json(newEventBody)
}