const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()


/** 
 * Purpose Statement--findUserProfilimage
 * 
*/



/**
 * Function Signature--findUserProfilimage
 * @param {string} currentUser - represents the currend User Id
 * @returns {object} Returns an array of event ids. 
 */




exports.DisplayUserofJoinEvents = async(req,res) => {
    const currentUser = req.user.userId
    // console.log(user)
    
     try{
        if(req.user){
            const getEventIdofJointUser =  await prisma.userJoinEvent.findMany({
                where: {
                    user_id: currentUser
                }
            })
            // console.log(getEventIdofJointUser)
            res.status(200).json(getEventIdofJointUser)
        }

     }catch(error){
        console.log('Unexpected Error on server side for DisplayUserofJoinEvents handler ');
     }



}




exports.DisplaygetEventbyjoinId = async(req,res) => {

    const body = req.body
    // console.log(body);
    
    // console.log(body.eventid);



    try{
        if(req.user && body){

            
            const eventData = await prisma.eventPrompt.findMany({
                where:{
                    id: {
                        in: body.eventid
                    }
                    
                }
            })


            // console.log(eventData.length)
            // console.log(eventData);
            res.status(200).json(eventData)

        }

    }catch(error){
        console.log('Failed the handler logic on DisplaygetEventbyjoinId ')
    }

}