import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from '../libs/prisma';
import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



/**
 * 
 * 
 * 
 * 

*/



interface AuthenticatedRequest extends Request {
  user?: any;
  decodedUserId: any;
  category: any
}
interface DJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}


const SECRET_KEY=  process.env.SECRET_KEY as string

  async function  userGetCategoryEvent (req: Request, res: Response, next: NextFunction): Promise<void> {
    
    // const usertoken = req.body.token
    // // console.log(usertoken);
    // const decoded = jwt.verify(usertoken, SECRET_KEY) as DJwtPayload
    // const userId = decoded.userId
    // // console.log(userId);
   
    // console.log(selectedCategory);
    // console.log(req);
    const userId = (req as AuthenticatedRequest)?.decodedUserId
    // console.log(userId);
    const selectedCategory = req.body.cateogory
    // console.log("selectedEvent:", selectedCategory);
   

 
    try {
        if (userId && selectedCategory) {
            

          const getUserselectedData = await prisma.event.findMany({
            where: {
              eventType: selectedCategory
            }
          })

            res.status(200).json(getUserselectedData)
            


        
        }else{
          res.status(400).json({message: "Invalid Request on userGetCategoryEvent handler function"})
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside userGetCategoryEvent handler function"  })

    }
   
}


export default userGetCategoryEvent;
