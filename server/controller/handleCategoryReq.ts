import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { Response, Request } from "express";




/**
 * 
 * 
 * 
 * 

*/



interface AuthenticatedRequest extends Request{
    user?: any
}


  async function  userGetCategoryEvent (req: AuthenticatedRequest, res: Response): Promise<void> {

    const user_Id = req.user.userId
    console.log(user_Id);
    
   

 

    // try {
    //     if (req.user) {


        
    //     }

    // } catch (error) {
    //     console.log('Error on server side:', error)
    //     res.status(500).json({ message: "Unexpected Error on serverside" })

    // }

    res.json({message: "connected with Backend"})
}


export default userGetCategoryEvent;
