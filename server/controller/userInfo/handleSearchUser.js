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



/** 
 * Purpose Statement--findUserProfilimage
 * The finduserProfilImage handler logic recieves an other user parameter id from the clien side and queries with it an image path from the picture database table 
 * 
*/



/**
 * Function Signature--findUserProfilimage
 * @param {string} userParam - other user Id
 * @returns {object} Returns an object from the picture table.
 */


// exports.findUserProfilimage = async (req, res) => {


//     const userParam = await req.params.id

//     try {

//         if (userParam) {

//             const userImage = await prisma.picture.findFirst({
//                 where: {
//                     picture_owner_id: userParam
//                 }
//             });
//             // console.log(userImage);
//             res.json(userImage)
//         }
//         else {
//             res.status(401).json({ error: 'user could not be find' })
//         }


//     } catch (error) {
//         console.log('failed to connect to db')
//         console.log(error)
//         res.status(500).send('Error getting the Imagedata')
//     }
// }

