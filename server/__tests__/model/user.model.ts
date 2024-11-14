import { account } from "@prisma/client"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export const userAccount = (account: Omit<account, "userId" > ) => {

    return prisma.account.create({
        data: account

    })


}