import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from "express";

/** 
 * Purpose Statement--searchforClosefriends
 *The searchforClosefriends function receives a queried body and checks if the user exist in the account database table. 
  If the user exist in the account table the function will return an object with the other users information. 
  Based on this term another condition will be executed which checks if both users have the same status of 2. 
  If the requirement is true the function will return an Id object of the other user

/**
 * Function Signature--searchforClosefriends
 * @param {string} currentUser - represents the current user's Id
 * @param {body} body - represents the queried data 
 * @returns {body} Returns the other user's ID
 */



interface AuthenticatedRequest extends Request{
    user?: any
}



export async function searchforClosefriends (req: AuthenticatedRequest,res: Response):Promise<void>  {

    const currentUser = req.user.userId
    // console.log(currentUser);
    const body = req.body.searchfriendsvalue
    console.log("searchforClosefriends:",body);
    try{
        if(currentUser && body){
            const searchforUser = await prisma.account.findUnique({
                where: {
                    userName: body
                }
            })

            if(searchforUser) {
                try {
                    // console.timeEnd('prismaQuery');
                    const closefriendsconnection = await prisma.userTouser.findMany({
                        where: {
                            userRequested_id: currentUser,
                            userFollowed: searchforUser.userId,
                            connection_status: 2
                        },
                    });
                    
                    res.status(200).json(closefriendsconnection);
                } catch (error) {
                    console.error('Error executing Prisma query:', error);
                    
                }
            }else{
                res.json({message:"user could not be found"})
            }
            
        }

    }catch(error){
        res.status(200).json({message: " No request from current user",error})
    }
    

    
    
}

/** 
 * Purpose Statement--searchImgUrl
 *The searchImgUrl function receives the other user Id as an object and queries with it the image url from pictures database table. 
  If the image Url exist the query will return an object with url
  

/**
 * Function Signature--searchImgUrl
 * @param {string} otherUserId - represents the other user's Id
 * @returns {body} Returns an image url object.
 */



 export async function searchImgUrl(req:  AuthenticatedRequest, res: Response):Promise<void>  {

    const otherUserId = req.params.id
    // await searchImgUrl(req as AuthenticatedRequest, res)

    // console.log("searchImgUrl", otherUserId);

    try{
        if(req.user && otherUserId){
            const otherUserData = await prisma.account.findUnique({
                where: {
                    userId: otherUserId
                }, include: {
                    picture: true
                }

            })

            res.status(200).json([otherUserData])
        }
        
    }catch(error){
        res.json({message: "Invalid request to searchImgUrl handler"})
    }
    
}



export default {searchImgUrl,searchforClosefriends }