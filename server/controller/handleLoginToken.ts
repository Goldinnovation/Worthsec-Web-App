import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { Express } from 'express';
import { generateToken } from '../config/passport';




interface AuthenticatedRequest extends Request{
  user?: Express.User
}
/** 
 * Purpose Statement--userlog
 *By clicking the login button the user triggers the API endpoint userlog.
 *The endpoint executes the passport authenticatiion, which verfies if the user information exist the  in the account database table 
 *if the user exist in the account database table the passport authenticator creates a session Id for the user and stores it 
 *in the session database table and cookie. Throughthe session id the user will be redirect to the main page
*/



const userloginToken = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    
    passport.authenticate('local', { session: false },  (err: Error, user: Express.User | false, info: {message: string} | undefined)=> {
        if (err) {
          return res.status(500).json({ message: 'Authentication Error', error: err.message });
        }
        if (!user) {
          return res.status(401).json({ message: 'User not found', info });
        }
        const token = generateToken(user as any);
        res.json({ token });
      })(req, res, next);


  
}

export default userloginToken