import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { NextFunction } from "express";
import giveCurrentDateTime from "../../utils/date";
import {getStorage, ref, deleteObject, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import config from '../../config/firebase'
import sharp from 'sharp'
import {execFile} from 'node:child_process';
import tmp from "tmp"
import gifsicle from "gifsicle"
import * as fs from 'fs';

import { resolve } from "node:path";
import { rejects } from "node:assert";
import { error } from "node:console";



// The function queries the currentUser picture record through the userId



// initialize firebase application
initializeApp(config.firebaseConfig);

// initialize the storage with the firebase service 
const storage = getStorage();

interface AuthenticatedRequest extends Request{
  user?: any;
  file?: Express.Multer.File;
}


// Function for storing the Firebase URL in the database 
export async function handleuserBackgroundUpload(req: AuthenticatedRequest, res: Response): Promise<void> {
  // console.log("knock knock");


  const userBackgroundData = await processImageData(req, res)

  console.log('User Background Data', userBackgroundData);


  res.json({message: "User Uploaded a picture" });


};


// Storing Data in Firebase Cloud Storage  

export const processImageData = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "File could not be found" });
    }

    const file = req.file as Express.Multer.File;
    const dateTime = giveCurrentDateTime();

    // StoragePath Reference
    const storageRef = ref(
      storage,
      `userBackground/${dateTime}_${file.originalname}`
    );

    // compromising the image with sharp
    const compromiseGifData = await compromiseGif(file.buffer);

    // Defines the Content type of the data

    const metadata = { contentType: "image/gif" };

    // upload the file to the firebase storage
    const uploadaction = uploadBytesResumable(
      storageRef,
      compromiseGifData,
      metadata
    );

    // wait for the upload to complete
    const snapshot = await uploadaction;

    // gets the url of the Gif Data
    const uploadedGifUrl = await getDownloadURL(snapshot.ref);

    return uploadedGifUrl;
  } catch (error) {
    console.error("Error on FirebaseService handler function");
  }
};




// Compromising the GIF Data, to a customized Buffer 
export const compromiseGif = async (buffer: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      // converting the buffer to a temporary file, so gifsicle can process it
      // creates a unique temporary file with the .gif extension.
      const tmpInputFile = tmp.fileSync({ postfix: "gif" });
      const tmpOutputFile = tmp.fileSync({ postfix: "gif" });

      // Assining the buffer to a temporary input file
      fs.writeFileSync(tmpInputFile.name, buffer);

      // Does not hadle In-memomery buffer, can only process butffer on file paths

      execFile(
        gifsicle,
        [
          "--resize",
          "400x300",
          "--optimize",
          "--delay", "20",
          "--output",
          tmpOutputFile.name,
          tmpInputFile.name,
        ],
        (error) => {
          error &&
            (() => {
              return reject(error);
            });

          // Returning compromised Buffer

          const optimizedGifBuffer = fs.readFileSync(tmpOutputFile.name);
          resolve(optimizedGifBuffer);
        }
      );
    } catch (Error) {
      console.error("Error on compromiseGif data function, Invalid File");
    }
  });
};


export default{handleuserBackgroundUpload}