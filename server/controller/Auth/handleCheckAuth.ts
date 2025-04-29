import { Response, Request, NextFunction } from "express"


interface AuthenticatedRequest extends Request{
    user?: any
}






const handlecheckAuth = (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.id;
    const loggedUser =  (req as AuthenticatedRequest).user?.userName as string 
    try {
     
        if(loggedUser !== username){
           return  res.status(200).json({message: "Invalid User Request", activeUser:loggedUser })
        }
           return  res.status(200).json({message: "User Authenticated"})
    } catch (error) {
        console.log("Server Error on logout handler function HandlecheckAuth, CatchBlock - True:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default handlecheckAuth