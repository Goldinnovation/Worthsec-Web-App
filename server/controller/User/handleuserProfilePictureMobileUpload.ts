

import prisma from '../../libs/prisma';
import { Request, Response } from "express";
import { NextFunction } from "express";
import { Button } from 'selenium-webdriver';
import giveCurrentDateTime from '@/server/utils/date';
import {getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../../config/firebase'
import sharp from 'sharp'



interface AuthenticatedRequest extends Request{
    user?: any;
    decodedUserId: any
    file?: Express.Multer.File;
  }
  
  
  
initializeApp(config.firebaseConfig);
const storage = getStorage();


export async function uploadProfilePicture(req: Request, res: Response): Promise<void>{
// 
    // console.log('req overall', req.body);
    try{
      const userId = (req as AuthenticatedRequest)?.decodedUserId
       const base64String = req.body.image
      const buffer = Buffer.from(base64String, "base64")
      const fileName =  req.body.imageName
      const mimetype = req.body.imageMimeType

      if (!userId || userId === undefined || userId === " ") {
        res.status(400).json({ message: 'Invalid Request, userId is required' });
        return
      }


     const cloudImage = await processImage(buffer, fileName, mimetype)
     console.log('cloudImage',cloudImage);
     res.json({message: "connected with the backend"})

    


    }catch(error){
      console.error('Erron on function:uploadProfilePicture', error);
    }
}


export const processImage = async(buffer: any, fileName:string, mimetype: string) => {

  console.log('in processImAGE');
  
  const dateTime = giveCurrentDateTime();
  const storageRef = ref(storage, `userProfileImage/${dateTime}_${fileName}`);


  const metadata = {
    contentType: mimetype,
  };

  const compromiseImage = await sharp(buffer)
  .resize({ width: 800, height: 1050 })
  .webp({ quality: 100 })
  .toBuffer();

  const uploadaction = uploadBytesResumable(
    storageRef,
    compromiseImage,
    metadata
  );

  const snapshot = await uploadaction;
  const ImageUrl = await getDownloadURL(snapshot.ref);

  return ImageUrl

} 


export default uploadProfilePicture

