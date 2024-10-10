
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()
import prisma from '../libs/prisma';
import mockprisma from "../libs/prisma"



interface AuthenticatedRequest extends Request{
    user?: any
    decodedUserId: any
    userSelectedInterests: any
}





//   The function receives a userId with a list of  selected interest strings and stores it in the database table userInterest

 const storeInterestData = async (req: Request, res: Response ) => {


    
    const userId = (req as AuthenticatedRequest)?.decodedUserId
    const selectedInterests = (req as AuthenticatedRequest)?.userSelectedInterests
   


    try{
        if(userId && selectedInterests){
            console.log('trigger');
            console.log(userId);
            console.log(selectedInterests);
            const storeUserSelectedInterestData = await prisma.userInterest.create({
                data: {
                    user_interest_id: userId,
                    interest_list:  selectedInterests
                    
                }
            })
            console.log("data:",storeUserSelectedInterestData);
            res.status(200).json({message: "Interests are successfully stored"})

        }else{

            res.status(400).json({message: "Invalid Request Body data on the StoreInterestdata handler function"})
        }
         

    }
    catch(error){
        console.log('Errror on handler function storeInterestData', error);
        res.status(400).json({message: "Catched Error on Response of handler storeInterstData"})

    }
    // res.status(200).json({message:"connected"})
}

export default storeInterestData
