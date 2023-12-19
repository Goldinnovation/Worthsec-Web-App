const {PrismaClient} = require('@prisma/client');
const { all } = require('axios');
const fs = require('fs')
const path = require('path')
const {getStorage, ref, deleteObject, getDownloadURL, UuploadBytesResumable, uploadBytesResumable}=require("firebase/storage")
const {initializeApp} = require("firebase/app")
const config = require('../config/firebase')
const Imageupload = require("../Middlware/coverImage");
const giveCurrentDateTime = require('../utils/date')
const prisma = new PrismaClient()
const sharp = require('sharp')

// initialize firebase application
initializeApp(config.firebaseConfig);

// initialize the storage with the firebase service 
const storage = getStorage();



// The user creates a event, which enterd information will be stored in the in database eventPrompt 
// Unless the Image, it will be stored in firebase cloud storage. After storing the image firebase will create 
// a url link which enables the user to view the image as URL 

exports.createEvent = async(req,res) => {

    
    
        try{
            if(!req.file){
                res.status(400).json({message:"File could not be found"})
            }
            // storage path reference 
            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `files/${dateTime}_${req.file.originalname}`)

            // compromising the image with sharp 

            const compromiseImage = await sharp(req.file.buffer)
            .resize({width: 800, height: 1050})
            .jpeg({quality: 80})
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

            res.status(200).json({ message:"file successful uploaded" });


        // Converts the eventtype to an int
        const stringEventType = req.body.eventType
        IntEventType = parseInt(stringEventType, 10)
        const userId = req.user.userId
        console.log(downloadImageUrl);

        // Stores the data in the Database 
        const newEventBody = {
            ...req.body, 
            ImageCoverUpload: downloadImageUrl,
            eventType: IntEventType,
            eventHost: userId,
            
        }

        
    
        try {
            const newCreateEvent = await prisma.eventPrompt.create({ data: newEventBody});
            console.log(newCreateEvent, "successful uploaded")
            // res.status(200).json({messaage: "successful uploaded on the database"})
            
            
        } catch (error) {
            console.error(error)
            res.status(500).send('issue server side')
        }

        }catch(error){

            console.log(error)
            res.status(500).json({message:"unexpected Error, trying to handle the file data"})
        }

        
        
    }



































// find the Event Object throw the user id and responds with the object inside of an array  


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

    // const deletedEvent = await prisma.eventPrompt.delete({
    //     where: {id: id},
    // })

    // res.json(deletedEvent)
}

