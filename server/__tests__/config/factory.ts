import { ac } from "@faker-js/faker/dist/airline-BLb3y-7w";
import { userAccount as createDBUserAccount} from "../model/user.model";
import {faker} from "@faker-js/faker"
import { account } from "@prisma/client";

const createAcc = (role: account["role"]) => () => 
    createDBUserAccount({
        userName: faker.internet.username(), 
        userEmail: faker.internet.email(),
        userPassword1: faker.internet.password(),
        createdAt: faker.date.past(),
        role,
    })

export const createNormalAccount = createAcc("USER")



export const createAdminAccount =  createAcc("ADMIN")