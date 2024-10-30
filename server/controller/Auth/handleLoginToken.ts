import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { Express } from 'express';
import { generateToken } from '../../config/passport';



interface User {
  userId: string, 
  userName: string, 
  userEmail: string, 
  userPassword1: string

}


// interface AuthenticatedRequest extends Request{
//   user?: User

// }
/** 
 * Purpose Statement--userlog
 *By clicking the login button the user triggers the API endpoint userlog.
 *The endpoint executes the passport authenticatiion, which verfies if the user information exist the  in the account database table 
 *if the user exist in the account database table the passport authenticator creates a session Id for the user and stores it 
 *in the session database table and cookie. Throughthe session id the user will be redirect to the main page
*/



const authenticate = (req: Request, res: Response, next: NextFunction) => 
  new Promise<User | false>((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err: Error, user:User | false, info: {message: string} | undefined) => {
      if (err) {
        reject(err);
      } else if (!user) {
        reject(new Error('User not found'));
      } else {
        resolve(user);
      }
    })(req, res, next);
  });




const userloginToken =  async (req: Request, res: Response, next: NextFunction) => {
    
   
        try{
          const user = await authenticate(req, res, next);

          if (user === false) {
            return res.status(401).json({ message: 'User not found' });
          }
      
          const token = generateToken(user as any);
         
         
          if(token){

            const userId = user?.userId
            const find_userInterest =  await prisma.userInterest.findUnique({
              where: {
                 user_interest_id: userId
              },

            })
            
            if(find_userInterest === null){

            
              res.json({
                token, 
                message: "Interest Section is empty"
              })

            }else{

                res.json({ 
                  token, 
                 message: "Interest data exist"
               });


            }

           
         
          


          }

        }catch(error){
          console.error('Error on Login ', error)
        }
        
  
  
}

export default {userloginToken, authenticate}