const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



/** 
 * Purpose Statement--searchUserbyUser
 *  The searchUserbyUser handler allows the current user to retrieve the other users data.
 *  By typing the other users name on the client side, the handler logic will use the request to retrieve the searched picture object from the database
 * 
*/



/**
 * Function Signature--searchUserbyUser
 * 
 * @param {string} searchUserName - Types value from the client side.
 * @returns {object} Returns an object of the other user from the database account table.
 */


exports.searchUserbyUser = async (req, res, next) => {

    const searchUserName = req.body.searchValue

    try {
       const searchUser = await prisma.account.findMany({
            where: {

                userName: searchUserName
            },
            include: {
                picture: true
            }
        })

        console.log(searchUser)
        res.status(200).json(searchUser)



    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Could not find User", error })

    }
      

}






