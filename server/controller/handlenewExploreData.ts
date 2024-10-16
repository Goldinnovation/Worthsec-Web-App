import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';
// const apicache = require('apicache');
// const cache = apicache.middleware;




interface AuthenticatedRequest extends Request {
    user?: any
}




export async function getNewEventData(req: AuthenticatedRequest, res: Response): Promise<void> {

    console.log(req);
    // try {
     

    // } catch (error) {
    //     console.log("Bad request:", error)
    // }



    res.status(200).json({message: "connected"})
}


export default { getNewEventData }