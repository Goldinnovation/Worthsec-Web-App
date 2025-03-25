import bcrypt from 'bcrypt';
import prisma from '../../libs/prisma.js';
const checksIfUserExist = async (req, res) => {
    try {
        const userName = req.body.userName;
        const userExist = await prisma.account.findFirst({
            where: {
                userName: userName
            }
        });
        createsNewAcc(userExist, req, res);
    }
    catch (error) {
        console.log("Server Error on checksIfUserExist handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const createsNewAcc = async (userExist, req, res) => {
    try {
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const hashpw = await bcrypt.hash(req.body.userPassword1, 10);
        if (userExist) {
            res.status(400).json({ message: 'User already Exist' });
            return;
        }
        await prisma.account.create({
            data: {
                userName: userName,
                userEmail: userEmail,
                userPassword1: hashpw
            }
        });
        res.json({ message: "new user created" });
    }
    catch (error) {
        console.log("Server Error on createsNewAcc handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default checksIfUserExist;
