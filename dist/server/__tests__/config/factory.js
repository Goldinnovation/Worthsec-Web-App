import { userAccount as createDBUserAccount } from "../model/user.model";
import { faker } from "@faker-js/faker";
const createAcc = (role) => () => createDBUserAccount({
    userName: faker.internet.username(),
    userEmail: faker.internet.email(),
    userPassword1: faker.internet.password(),
    createdAt: faker.date.past(),
    role,
});
export const createNormalAccount = createAcc("USER");
export const createAdminAccount = createAcc("ADMIN");
