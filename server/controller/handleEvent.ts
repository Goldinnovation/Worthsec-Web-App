
// const {getStorage, ref, deleteObject, getDownloadURL, UuploadBytesResumable, uploadBytesResumable}=require("firebase/storage")

import {getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../config/firebase'
import { Sharp } from 'sharp'
import sharp from 'sharp'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import giveCurrentDateTime from '../utils/date'
import { Request, Response } from 'express';
import multer from 'multer';
import { Express } from 'express';





// initialize firebase application
initializeApp(config.firebaseConfig);

// initialize the storage with the firebase service 
const storage = getStorage();


/**
 * Purpose Statement--createEvent
 *  The user can create an event, by entering the requested information such as like name,date,time,Image, description and type of event. 
 *  After the accomplishment of the process the data will be stored in the event database table.
 *  Unless the Image file, this will be stored on a external database. I choose for the project Worthsec firebase cloud storage. 
 *  After storing the image file on the cloud, firebase will generate a url as respond. This url will be stored in the event database table. 
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



interface AuthenticatedRequest extends Request{
    user?: any,
    file?: Express.Multer.File
}





const createEvent = async (req: AuthenticatedRequest, res: Response) => {

    const trybody = req.body
    console.log(trybody)

    try {
        if (!req.file) {
            res.status(400).json({ message: "File could not be found" })
        }

        const file = req.file as Express.Multer.File;

        // storage path reference 
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${dateTime}_${file.originalname}`)

        // compromising the image with sharp 

        const compromiseImage = await sharp(file.buffer)
            .resize({ width: 800, height: 1050 })
            .jpeg({ quality: 80 })
            .toBuffer();




        const metadata = {
            contentType: file.mimetype
        }

        // upload the file to the firebase storage
        const uploadaction = uploadBytesResumable(storageRef, compromiseImage, metadata)

        // wait for the upload to complete 
        const snapshot = await uploadaction;

        // gets the url of the post 
        const downloadImageUrl = await getDownloadURL(snapshot.ref)



        //  declaration of object properties 
        const userId = req.user.userId
        const eventTitle_value = req.body.eventTitle
        const eventDate_value = req.body.eventDate
        const eventType_value = req.body.eventType
        const zipcode_value = req.body.eventZipcode
        console.log(zipcode_value);
        const eventAddress_value = req.body.eventAddress
        const cityType_value = req.body.cityType
        const eventDescription_value = req.body.eventDescriptionContent
        const eventTime_value = req.body.eventTime
        let selectedRange_string = req.body.selectedRangeofEvents
        const  selectedRange_int_value  = parseInt(selectedRange_string , 10)
        console.log(selectedRange_int_value);
        console.log(downloadImageUrl);
        // console.log(req.body.Only_friends)


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
          
            
          

            const newCreateEvent = await prisma.event.create({
                data:
                {
                    eventHost: userId,
                    eventTitle: eventTitle_value,
                    eventType: eventType_value,
                    eventDate: eventDate_value ,
                    eventDescriptionContent: eventDescription_value,
                    eventTime: eventTime_value,
                    ImageCoverUpload: downloadImageUrl,
                    eventInviteType: eventinviteNum,
                    eventAddress: eventAddress_value,
                    eventZipcode: zipcode_value,
                    cityType: cityType_value,
                    selectedRangeofEvents: selectedRange_int_value


                       

                }
            });

          
            console.log(newCreateEvent, "successful uploaded")
            res.status(200).json({ message: "file successful uploaded" });

            
            // res.status(200).json({messaage: "console.log('successful uploaded on the database');"})


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


const findEvents = async(req: AuthenticatedRequest,res: Response) => {
  


    
    try{
        if(req.user){
            
            const userEvents =  await prisma.event.findMany({
                where: {
                    eventHost: req.user.userId
                },

            });

           

            
            // console.log(userEvents.length);
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

 const deleteEvent = async(req: AuthenticatedRequest,res: Response) => {
    console.log('hallo');
    const id = req.params.id;
    console.log('inside id:',id)
    console.log(req.body.eventpath);
    const imagePath = req.body.eventpath
   
    try{
        
        if(!id){
            console.log('inside error');
            res.status(400).json({message: 'Image could not be found, provoke bad request'})
        }else{
         
            try{
                const userDeletedEvent = await prisma.event.delete({
                    where: {
                        eventId: id
                    }
                })
                console.log(userDeletedEvent);
                console.log('Event is successfull deleted from the db ');
                const storageRef = ref(storage, imagePath)
                await deleteObject(storageRef)
                res.status(200).json({message: "Event is successfull deleted from the db "})

            }catch(error){
                console.log('DB query Execution failes on deleteEvent:', error);
            }
        
        }

     
        
    }catch(error){
        res.status(500).json({message:"Error trying to Delete the object"})
    }


}


export default {deleteEvent, findEvents, createEvent }