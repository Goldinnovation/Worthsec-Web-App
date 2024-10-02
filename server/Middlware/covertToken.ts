import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
  decodedUserId: any;
  userSelectedInterests: any;
}
interface DJwtPayload extends JwtPayload {
  userId: string;
  email: string; //before was Email
}

// Receives a user token and decodes it to the users Id and Email. Afterwards the function passes the decodedId and
//  the list of Selected interest to the local request property further to the next handler function 

const convertToken = (
  req: Request,
  res: Response,
  next: NextFunction
)  =>  {
  if (req.body) {
    const SECRET_KEY = process.env.SECRET_KEY as string;
    const usertoken = req.body.token;
    const decoded = jwt.verify(usertoken, SECRET_KEY) as DJwtPayload;
    // req.decodedUserId
    (req as AuthenticatedRequest).decodedUserId = decoded.userId;
    (req as AuthenticatedRequest).userSelectedInterests = req.body.pickedIntesrest;

    next();
  } else {
    res
      .status(400)
      .json({
        Message:
          "There have been a bad Request on the converToken middleware function",
      });
  }
};

export default convertToken;
