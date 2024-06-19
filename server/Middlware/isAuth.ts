import { Response, Request, NextFunction } from "express";

interface AuthenticatedRequest extends Request{
    user?: any
}


const isAuthenticated = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    if(req.user) {
        // console.log(req.user)
    
        // console.log('user is aUthenticated')
        next(); 

    }else{
        console.log('User is not Auth')
        return res.redirect('/')
    }
} 


export default isAuthenticated