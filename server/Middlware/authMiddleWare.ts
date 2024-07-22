import { Response, Request, NextFunction } from "express";
import session from "express-session";
import jwt from 'jsonwebtoken';


interface AuthenticatedRequest extends Request{
    user?: any
}


const authMiddlewareCheck = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
   
        const tokenKey = process.env.SECRET_KEY as string
     

    try{
        if(req.user) {
            console.log('authicated with session');
          
            next(); 
    
        }else if (token){
            jwt.verify(token,tokenKey,(err,decoded) => {
                if(err){
                    console.log('authicated verify error with token');
                    return res.status(401).json({message: "Invalid token "})
                }else{
                    req.user = decoded
                    // console.log(req.user);
                    next();
                }
            } )
            
        }else{
            return res.redirect('/')

        }

    }catch(error){
        console.log('Error on Authentication middleware', error);
    }
 
} 


export default authMiddlewareCheck