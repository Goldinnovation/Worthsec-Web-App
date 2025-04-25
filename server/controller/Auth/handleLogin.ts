import { Request, Response, NextFunction } from "express";
import passport from 'passport';
import { Express } from 'express';





interface AuthenticatedRequest extends Request{
  user?: Express.User,
  userName: any 
}

declare namespace Express {
  export interface User {
    userName: string; // Add your custom properties here
    email?: string;   // Add other properties as needed
    // Add more fields if your user object has them
  }
}
/**
 * Purpose Statement — userLogin
 * 
 * The userLogin function executes the Passport authentication method, which verifies whether the user's information exists in the "account" database table.
 * If the user exists in the "account" table, Passport creates a session ID for the user, storing it in both the "session" database table and a cookie,
 * allowing the user to remain logged in even during navigation and page refreshes.
 * If authentication is successful, the user is redirected to their profile page.
 * 
*/



/**
 * Function Signature--userLogin
 * 
 * @param {object} user - Represents a user object.
 * @returns {json} - Returns a JSON message describing the login status.
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
       
        const userName = user.userName

        res.json({  userNameData: userName, message: "Login Successful" })
      });
    })(req, res, next);

  } catch (error) {
    console.log("Server Error on userLogin handler function, CatchBlock - True:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default userLogin