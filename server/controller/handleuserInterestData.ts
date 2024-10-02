
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import jwt, { JwtPayload } from "jsonwebtoken";



interface AuthenticatedRequest extends Request{
    user?: any
    decodedUserId: any
    userSelectedInterests: any
}

interface DJwtPayload extends JwtPayload {
    userId: string;
    email: string;   //before was Email 
  }


//   The function receives a userId with a list of  selected interest strings and stores it in the database table userInterest

 const storeInterestData = async (req: AuthenticatedRequest, res: Response, next: NextFunction ) => {

    const userId = req?.decodedUserId
    const selectedInterests = req?.userSelectedInterests

    try{
        if(userId && selectedInterests){
            const storeUserSelectedInterestData = await prisma.userInterest.create({
                data: {
                    user_interest_id: userId,
                    interest_list:  selectedInterests
                    
                }
            })

            console.log(storeUserSelectedInterestData);
            res.status(200).json({message: "Interest are successfully stored"})

        }else{

            res.status(400).json({message: "Invalid Request Body data on the StoreInterestdata handler function"})
        }
         

    }
    catch(error){
        console.log('Errror on handler function storeInterestData', error);
        res.status(400).json({message: "Catched Error on Response of handler storeInterstData"})

    }
    //  res.status(200).json({message:"connected"})
}

export default storeInterestData