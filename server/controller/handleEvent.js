const {PrismaClient} = require('@prisma/client');
const {getStorage, ref, deleteObject, getDownloadURL, UuploadBytesResumable, uploadBytesResumable}=require("firebase/storage")
const {initializeApp} = require("firebase/app")
const config = require('../config/firebase')
const giveCurrentDateTime = require('../utils/date')
const prisma = new PrismaClient()
const sharp = require('sharp')


// initialize firebase application
initializeApp(config.firebaseConfig);

// initialize the storage with the firebase service 
const storage = getStorage();


/**
 * Purpose Statement--createEvent
 *  The user can create an event, by entering the requested information such as like name,date,time,Image, description and type of event. 
 *  After the accomplishment of the process the data will be stored in the eventprompt database table.
 *  Unless the Image file, this will be stored on a external database. I choose for the project Worthsec firebase cloud storage. 
 *  After storing the image file on the cloud, firebase will generate a url as respond. This url will be stored in the eventprompt database table. 
 *  Enabling the presentation of the Image on the client side 
 * 


/**
 * Function Signature--userFavorEvent
 * 
 * @param {string} userId - The value represents the ID of the current user that favored the Event.
 * @param {string} req.body.eventTitle - The value represents the ID of the Event that was favored by the user.
 * @param {int} IntEventType
 * @param {string} req.body.eventDate
 * @param {string} req.body.eventDescriptionContent
 * @param {string} req.body.eventTime
 * @param {string}  downloadImageUrl
 * @param {int} eventinviteNum
 * @returns {string} Returns an object of the created event. 
 */





exports.createEvent = async (req, res) => {

    // const trybody = req.body
    // console.log(trybody)

    try {
        if (!req.file) {
            res.status(400).json({ message: "File could not be found" })
        }
        // storage path reference 
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${dateTime}_${req.file.originalname}`)

        // compromising the image with sharp 

        const compromiseImage = await sharp(req.file.buffer)
            .resize({ width: 800, height: 1050 })
            .jpeg({ quality: 80 })
            .toBuffer();




        const metadata = {
            contentType: req.file.mimetype
        }

        // upload the file to the firebase storage
        const uploadaction = uploadBytesResumable(storageRef, compromiseImage, metadata)

        // wait for the upload to complete 
        const snapshot = await uploadaction;

        // gets the url of the post 
        const downloadImageUrl = await getDownloadURL(snapshot.ref)

        res.status(200).json({ message: "file successful uploaded" });


        // Converts the eventtype to an int
        const stringEventType = req.body.eventType
        IntEventType = parseInt(stringEventType, 10)
        const userId = req.user.userId
        console.log(downloadImageUrl);
        console.log(req.body.Only_friends)


        let eventinviteNum;
        if (req.body.Only_friends === '1') {
            const num1 = req.body.Only_friends
            eventinviteNum = parseInt(num1, 10)
        } else if (req.body.friends_Plus_Plus === '2') {
            const num2 = req.body.friends_Plus_Plus
            eventinviteNum = parseInt(num2, 10)
        } else if (req.body.worldwideClass === '3') {
            const num3 = req.body.worldwideClass
            eventinviteNum = parseInt(num3, 10)
        }

      



        try {
          
            
          

            const newCreateEvent = await prisma.eventPrompt.create({
                data:
                {
                    eventHost: userId,
                    eventTitle: req.body.eventTitle,
                    eventType: IntEventType,
                    eventDate: req.body.eventDate,
                    eventDescriptionContent: req.body.eventDescriptionContent,
                    eventTime: req.body.eventTime,
                    ImageCoverUpload: downloadImageUrl,
                    eventInviteType: eventinviteNum

                }
            });

          
            console.log(newCreateEvent, "successful uploaded")
            
            // res.status(200).json({messaage: "successful uploaded on the database"})


        } catch (error) {
            console.error(error)
            res.status(500).send('issue server side')
        }

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "unexpected Error, trying to handle the file data" })
    }



}



































// find the Event Object throw the user id and responds with the object inside of an array  


exports.findEvents = async(req,res) => {
  

    
    try{
        if(req.user){
            
            const userEvents =  await prisma.eventPrompt.findMany({
                where: {
                    eventHost: req.user.userId
                },

            });

           

            
            // console.log(userEvents);
            res.json(userEvents);
        }else {
            res.status(401).json({error: 'user is not Authenticated to get events'})
        }

    }catch(error){
        console.error(error)
        res.status(500).send('Error with find Event logic  ')
    }

}








// Delete an Event Object 

exports.deleteEvent = async(req,res) => {
    const id = req.params.id;
    console.log(id)
    console.log(req.body.eventpath);
    const imagePath = req.body.eventpath
   
    try{
        
        if(!id){
            res.status(400).json({message: 'Image could not be found, provoke bad request'})
        }else{
            const deletedEvent = await prisma.eventPrompt.delete({
                where: {id: id},
            })
            console.log('Event is successfull deleted from the db ');
            res.status(200).json({message: "Event is successfull deleted from the db "})
        }

        const storageRef = ref(storage, imagePath)
        await deleteObject(storageRef)

        console.log('Image is deleted')
    
       

        
    }catch(error){
        res.status(500).json({message:"Error trying to Delete the object"})
    }


}

