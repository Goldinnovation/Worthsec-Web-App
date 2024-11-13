import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { Express } from 'express';





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



const userLogin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  try {
    passport.authenticate("local", (err: Error, user: Express.User | false, info: { message: string } | undefined) => {
      if (err) {
        console.log("error")
        return res.status(500).json({ message: "Authentication Error" });
      }
      if (!user) {
        console.log("user not found")
        return res.status(401).json("user not found");
      }
      req.login(user, (err) => {
        if (err) {
          console.log("user not catched")
          return res.status(500).json({ message: "Session error" });
        }
        console.log("user catched")
        res.json({ message: "Login Successful" })
      });
    })(req, res, next);

  } catch (error) {
    console.log("Server Error on userLogin handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default userLogin