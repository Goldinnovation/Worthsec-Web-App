import { PrismaClient } from "@prisma/client";
// const { json } = require("body-parser");
const prisma = new PrismaClient();
import { Request, Response } from "express";



// Display a list of currentUser close friends 



interface AuthenticatedRequest extends Request{
  user?: any
}

export async function getCloseFriends(req: AuthenticatedRequest, res: Response): Promise<void> {
  const currentUser = req.user;
  // console.log(user);

  try {
    if (currentUser) {
      const currentUserFriends = await prisma.userTouser.findMany({
        where: {
          userRequested_id: currentUser.userId,
          connection_status: 2,
        },
      });

    
      if (currentUserFriends.length > 0) {
        const arrobj = currentUserFriends.map((friendsId) =>friendsId.userFollowed)
        
        const closefriendsData = await prisma.account.findMany({
          where: {
            userId:{
              in: arrobj
            } 
          },
          include: {
            picture: true,
          },
        });
        // console.log(closefriendsData);
        res.json(closefriendsData);
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "unexpected Error und on handlerFunction getCloseFriends ",
      });
  }
};



// Creates a record of the Friends that are invited to the Event of the currentUser
export async function inviteClosefriendsToEvent(req: AuthenticatedRequest,res: Response): Promise<void>{

  console.log(req.body);

  const inviteData= req.body
  const currentUser= req.user

  console.log(inviteData, currentUser);
  console.log( currentUser.userId);

  try{
    if(inviteData && currentUser){
      const createInviterecord = await prisma.invitation.create({
        data: {
          event_invitedTo_Id: inviteData.eventIdData,
          otherUser_invited_Id: inviteData.friendsDataList,
          currentUser_invite_Id: currentUser.userId
        }
      })
      console.log(createInviterecord, "successful created Invitation")
      res.status(200).json({message:"friends are successfully invited" });

    }

  }catch(error){
    console.log(error);
    res
      .status(500)
      .json({
        message: "unexpected Error und on inviteClosefriendsToEvent server handler function ",
      });
  }

}

export default {inviteClosefriendsToEvent, getCloseFriends}