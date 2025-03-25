import prisma from '../../libs/prisma.js';
export async function handleUserDataInfoReq(req, res) {
    try {
        const currentUserId = req.user.userId;
        if (!currentUserId || currentUserId === undefined || currentUserId === " ") {
            res.status(400).json({ message: 'Invalid Request, currentUserId is required' });
            return;
        }
        const getUserData = await prisma.account.findUnique({
            where: {
                userId: currentUserId
            }, include: {
                picture: {
                    select: {
                        pictureUrl: true,
                        gifUrl: true
                    }
                }
            }
        });
        res.status(200).json(getUserData);
    }
    catch (error) {
        console.error("Unexpected Server on Error on handleUserDataInfoReq", error);
        res.status(500).json({ message: "Interval Server Error" });
    }
}
export default { handleUserDataInfoReq };
