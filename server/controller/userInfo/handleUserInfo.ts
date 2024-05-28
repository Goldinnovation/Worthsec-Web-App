import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { NextFunction } from "express";
// The function queries the currentUser picture record through the userId




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
export async function createProfilePicutre(req: AuthenticatedRequest, res: Response,  next: NextFunction): Promise<void> {
  console.log("knock knock");


  // console.log(pictureData.pictureUrl)
  // console.log(pictureData.picture_owner_id)

  try {
    const pictureData = {
      pictureUrl: req.file?.filename as string,
      picture_owner_id: req.user.userId,
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


export default{createProfilePicutre, deleteUserProfilePicture, getUserProfilePicture}