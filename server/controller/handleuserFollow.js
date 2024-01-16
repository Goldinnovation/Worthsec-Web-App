const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



exports.userFollowOtherUser = () => {
    const body = req.body
    console.log(body);

}