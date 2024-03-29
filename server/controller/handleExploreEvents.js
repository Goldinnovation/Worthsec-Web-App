const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const apicache = require('apicache');
const cache = apicache.middleware;









exports.exploreEvents = async(req,res) => {



    // receives Json string from the query request 
    const selectQueryString = req.query.selectedValues
    // console.log(selectQueryString)
    // parse the json string to an object 
    const selctedQueryObject = JSON.parse(selectQueryString)
    // console.log(selctedQueryObject)
   

    // Converting the all 3 string to Numbers 
    // if none of the numbers are selceted the value will be undefined 

   

    const selectedEventsTypeNum = parseInt(selctedQueryObject.explore_selectTypeofEvent__bmewZ, 10)
    const selectedType = (selectedEventsTypeNum >=1 && selectedEventsTypeNum <=3 ? selectedEventsTypeNum : undefined)
    // console.log(selectedType);

    const inputNumber =  parseInt(selctedQueryObject.selectedRangeofEvents, 10)
    const rangeEventNum = (inputNumber >= 9 && inputNumber <=20 ? inputNumber : undefined)
    // console.log(rangeEventNum);

    const inputCategoryNum  =  parseInt(selctedQueryObject.explore_selectTypeofEventCategory__KzDeU, 10)
    const inviteNum = (inputCategoryNum >=1 && inputCategoryNum <=3 ? inputCategoryNum : undefined)

    // console.log(inviteNum)

    try{
         if(req.user && selectedType !== undefined && inviteNum !== undefined){
            // console.log('sdsd');
            const getselectedEvents = await prisma.event.findMany({
                where: {
                    eventType: selectedType,
                    eventInviteType: inviteNum
                }
            })
            
        // console.log(getselectedEvents)
        // console.log(getselectedEvents.length)
        
         res.status(200).json(getselectedEvents)
         }

    }catch(error){
        console.log("Bad request:",error)
    }
    // res.json({message: "Successful Enterend the server handler "})


}