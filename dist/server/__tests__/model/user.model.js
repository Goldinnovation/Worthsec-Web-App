import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const userAccount = (account) => {
    return prisma.account.create({
        data: account
    });
};
