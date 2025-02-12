import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import multer from "multer";
import { Declaration } from "postcss";

interface AuthenticatedRequest extends Request {
  user?: any;
  decodedUserId: any;
 

  
}
interface DJwtPayload extends JwtPayload {
  userId: string;
  email: string; //before was Email
}

 
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).single("image");

const convertTokenNProcessImage = (
  req: Request,
  res: Response,
  next: NextFunction
)  =>  {
  try{

    if (req.body) {
      const SECRET_KEY = process.env.SECRET_KEY as string;
      const usertoken = req.body.token;
      const decoded = jwt.verify(usertoken, SECRET_KEY) as DJwtPayload;
    
      
      (req as AuthenticatedRequest).decodedUserId = decoded.userId;
      

     
      next();
    } else {
      res
        .status(400)
        .json({
          Message:
            "There have been a bad Request on the converToken middleware function",
        });
    }

  }catch(error){
    console.error("Unexpected Error - CategoryConvertToken middleware function", error)
    res.status(500).json({message: "Internal Server Error"})
  }
  
};

export default convertTokenNProcessImage;
