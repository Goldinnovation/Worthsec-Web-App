import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



/**
 * 
 * 
 * 
 * 

*/



interface AuthenticatedRequest extends Request{
    user?: any
}


interface DJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}


const SECRET_KEY=  process.env.SECRET_KEY as string

  async function  userGetCategoryEvent (req: AuthenticatedRequest, res: Response): Promise<void> {
    
    const usertoken = req.body.token
    // console.log(usertoken);
    const decoded = jwt.verify(usertoken, SECRET_KEY) as DJwtPayload
    const userId = decoded.userId
    // console.log(userId);
    const selectedCategory = req.body.cateogory
    console.log(selectedCategory);

 
    try {
        if (userId && selectedCategory) {
            

          const getUserselectedData = await prisma.event.findMany({
            where: {
              eventType: selectedCategory
            }
          })
          console.log(getUserselectedData);
            res.json(getUserselectedData)
            


        
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside userGetCategoryEvent handler function"  })

    }
   
}


export default userGetCategoryEvent;
