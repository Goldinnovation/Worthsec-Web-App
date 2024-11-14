import { userAccount } from "../model/user.model";


describe("creating users", () => {
    it("should get created", async() => {

        const account = await userAccount({
            userEmail: "sdsdsdsd", 
            userName: "weadsds",
            userPassword1: "edsdsd", 
            createdAt: new Date(),
            role: "USER"
        })

        expect(account).toBeDefined()

    })

})