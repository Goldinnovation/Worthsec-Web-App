import jwt from "jsonwebtoken";
const tokenDecodeAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(400).json({ message: "Invalid Request" });
        return;
    }
    const token = authHeader.split(' ')[1];
    const SECRET_KEY = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, SECRET_KEY);
    req.decodedUserId = decoded.userId;
    next();
};
export default tokenDecodeAuth;
