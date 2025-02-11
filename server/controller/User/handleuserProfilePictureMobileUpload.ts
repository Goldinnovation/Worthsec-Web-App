

import prisma from '../../libs/prisma';
import { Request, Response } from "express";
import { NextFunction } from "express";



interface AuthenticatedRequest extends Request{
    user?: any;
    file?: Express.Multer.File;
  }
  
  


export async function uploadProfilePicture(req: AuthenticatedRequest, res: Response): Promise<void>{


         console.log('req data', req.body);
    res.json({message: "connected with the backend"})
}



export default uploadProfilePicture

