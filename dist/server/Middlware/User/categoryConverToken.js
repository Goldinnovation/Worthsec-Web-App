import jwt from "jsonwebtoken";
// Receives a user token and decodes it to the users Id and Email. Afterwards the function passes the decodedId and
//  the list of Selected interest to the local request property further to the next handler function 
const DecodeANDVerifyToken = (req, res, next) => {
    try {
        if (req.body) {
            const SECRET_KEY = process.env.SECRET_KEY;
            const usertoken = req.body.token;
            const decoded = jwt.verify(usertoken, SECRET_KEY);
            req.decodedUserId = decoded.userId;
            next();
        }
        else {
            res
                .status(400)
                .json({
                Message: "There have been a bad Request on the converToken middleware function",
            });
        }
    }
    catch (error) {
        console.error("Unexpected Error - CategoryConvertToken middleware function", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default DecodeANDVerifyToken;
