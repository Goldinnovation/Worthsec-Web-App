const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



/**
 * Purpose Statement--userFavourEvent
 * The function allows the current user to favour an Event. 
 * Furthermore it gives the user the ability to store and retrieve the data for a period of time.



/**
 * Function Signature--userFavourEvent
 * 
 * @param {string} currentUserId - The value represents the ID of the current user that favoured the Event.
 * @param {string} favour_event_Id - The value represents the ID of the Event that was favoured by the user.
 * @returns {string} Returns a statement that the user was successfully stored in the userFavourEvent table.
 */

exports.userFavourEvent = async (req, res) => {

    const currentUserId = req.user.userId
    const favour_event_Id = req.body.favoreventId

    try {
        if (req.user && req.body) {

            const userfavoredEvent = await prisma.userFavourEvent.create({
                data:
                {
                    currentUser_id: currentUserId,
                    event_id: favour_event_Id
                }
            })

            console.log(userfavoredEvent)
            res.status(200).json({ message: "user successfully favored a event" })
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside" })

    }

}



