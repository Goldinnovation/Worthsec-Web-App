const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()



/**
 * Purpose Statement--userFavorEvent
 * The function allows the current user to favor an Event. 
 * Furthermore it gives the user the ability to store and  retrieve the data for a period of time.



/**
 * Function Signature--userFavorEvent
 * 
 * @param {string} favor_user_id - The value represents the ID of the current user that favored the Event.
 * @param {string} favor_event_id - The value represents the ID of the Event that was favored by the user.
 * @returns {string} Returns a statement that the user was successfully stored in the FavorEvent table.
 */

exports.userFavorEvent = async (req, res) => {

    const favor_user_id = req.user.userId
    const favor_event_id = req.body.favoreventId

    try {
        if (req.user && req.body) {

            const userfavoredEvent = await prisma.userFavorEvent.create({
                data:
                {
                    user_id: favor_user_id,
                    event_id: favor_event_id
                }
            })

            // console.log(userfavoredEvent)
            res.status(200).json({ message: "user successfully favored a event" })
        }

    } catch (error) {
        console.log('Error on server side:', error)
        res.status(500).json({ message: "Unexpected Error on serverside" })

    }

}



