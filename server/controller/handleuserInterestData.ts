
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import jwt, { JwtPayload } from "jsonwebtoken";


interface AuthenticatedRequest extends Request{
    user?: any
}

interface DJwtPayload extends JwtPayload {
    userId: string;
    email: string;
  }
  const SECRET_KEY=  process.env.SECRET_KEY as string

 const storeInterestData = async (req: AuthenticatedRequest, res: Response) => {

    const usertoken = req.body.token.token 
    const decoded = jwt.verify(usertoken, SECRET_KEY) as DJwtPayload
    const userId = decoded.userId
    const body = req.body.pickedIntesrest

    try{
            const storeUserInterestData = await prisma.userInterest.create({
                data: {
                    user_interest_id: userId,
                    interest_list:  body
                    
                }
            })

            console.log(storeUserInterestData);
            res.json({message: "Interest are successfully stored"})

    }
    catch(error ){
        console.log('Errror on handler storeInterestData', error);
        res.status(500).json({message: "Error on Response of handler storeInterstData"})

    }

}

export default storeInterestData