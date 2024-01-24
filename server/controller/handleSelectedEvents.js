const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()




exports.AllWorldwideEvents = async(req,res) => {
    

    
    const body = req.body 
    console.log(body);

    // Converting the all 3 string to Numbers 
    // if none of the numbers are selceted the value will be undefined 

    const selectEventTypeNum =
    req.body.explore_selectTypeofEvent__bmewZ === "1" ? parseInt(req.body.explore_selectTypeofEvent__bmewZ,10) : 
    req.body.explore_selectTypeofEvent__bmewZ === "2" ? parseInt(req.body.explore_selectTypeofEvent__bmewZ,10) :
    req.body.explore_selectTypeofEvent__bmewZ === "3" ? parseInt(req.body.explore_selectTypeofEvent__bmewZ,10) :
    undefined; 

    // console.log(selectEventTypeNum);


    const inputNumber =  parseInt(req.body.selectedRangeofEvents, 10)
    const rangeEventNum = (inputNumber >= 9 && inputNumber <=20 ? inputNumber : undefined)
    // console.log(rangeEventNum);

    const inputCategoryNum  =  parseInt(req.body.explore_selectTypeofEventCategory__KzDeU, 10)
    const inviteNum = (inputCategoryNum >=1 && inputCategoryNum <=3 ? inputCategoryNum : undefined)

    // console.log(inviteNum)

    try{
         if(req.user && selectEventTypeNum !== undefined && inviteNum !== undefined){
            const getselectedEvents = await prisma.eventPrompt.findMany({
                where: {
                    eventType: selectEventTypeNum,
                    eventInviteType: inviteNum
                }
            })
            
        console.log(getselectedEvents)
        console.log(getselectedEvents.length)
        res.status(200).json(getselectedEvents)
         }

    }catch(error){
        console.log("Bad request:",error)
    }
    // res.json({message: "Successful Enterend the server handler "})


}