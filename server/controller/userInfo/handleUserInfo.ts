import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { NextFunction } from "express";
import giveCurrentDateTime from "../../utils/date";
import {getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../../config/firebase'
import sharp from 'sharp'



// The function queries the currentUser picture record through the userId



// initialize firebase application
initializeApp(config.firebaseConfig);

// initialize the storage with the firebase service 
const storage = getStorage();

interface AuthenticatedRequest extends Request{
  user?: any;
  file?: Express.Multer.File;
}



export async function getUserProfilePicture (req: AuthenticatedRequest, res: Response,  next: NextFunction): Promise<void> {
  try {
    if (req.user) {
      const userImage = await prisma.picture.findFirst({
        where: {
          picture_owner_id: req.user.userId,
        },
      });
      res.json(userImage);
    } else {
      res.status(401).json({ error: "user could not be find" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting the Imagedata");
  }
};


// The function deletes the image from the picture database table through the currentUser id

export async function deleteUserProfilePicture(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (req.user) {
      const deleleProfPic = await prisma.picture.delete({
        where: {
          picture_owner_id: req.params.id,
        },
      });
      res.json(deleleProfPic);
    }
  } catch (error) {
    console.log("Catch ERROR on DELETE");
    res.status(500).send("CATCH DELETE REQ ERROR");
  }
};


// The function creates a new picture record for the currentUser inside the picture database table, only if the user does not already have a profile picture.  
// If the currentUser has a profile picture, the currentUser record will be updated to the new picture data.
export async function createProfilePicutre(req: AuthenticatedRequest, res: Response): Promise<void> {
  console.log("knock knock");


  // console.log(pictureData.pictureUrl)
  // console.log(pictureData.picture_owner_id)

  try {

    const imageData = await processImageData(req, res)

    const userProfileCloudImageData = imageData ?? "Default Picture"

    const pictureData = {
      pictureUrl: req.file?.filename as string,
      picture_owner_id: userProfileCloudImageData,
    };
  
    const existPic = await prisma.picture.findUnique({
      where: { picture_owner_id: req.user.userId },
    });

    if (existPic) {
      const updatePic = await prisma.picture.update({
        where: { picture_owner_id: req.user.userId },
        data: {
          pictureUrl: pictureData.pictureUrl,
        },
      });
      console.log("updated picture");

      res.json({ updatePic });
    } else {
      const createPic = await prisma.picture.create({
        data: pictureData,
      });

      console.log("new picture created");
      res.json({ createPic });
    }
  } catch (error) {
    console.log(error);
  }


};


export const processImageData = async(req: AuthenticatedRequest, res: Response) => {

  try{

    console.log('triggert processImageData');
    if (!req.file) {
        res.status(400).json({ message: "File could not be found" })
    }

    const file = req.file as Express.Multer.File;

    // storage path reference 
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `userProfileImage/${dateTime}_${file.originalname}`)

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



    return downloadImageUrl




}catch(error){
    console.error("Error on FirebaseService handler function")
}
}


export default{createProfilePicutre, deleteUserProfilePicture, getUserProfilePicture}