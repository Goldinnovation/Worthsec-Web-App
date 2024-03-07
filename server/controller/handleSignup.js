const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client');
const passport = require('passport')




const prisma = new PrismaClient()



/** 
 * Purpose Statement--createUserAccount
 * The createUserAccount handler logic gets the user's information such as userName, email, and password. 
 * Before creating the record on the database table. The function verifies if the user already exist.
 * If the response is undefined, the funciton will create a record in the table.
 * 
*/



/**
 * Function Signature--createUserAccount
 * @param {String} user - represents the user wants to sign Up on the pag 
 * @returns {object} Returns a json object message with the user is create the database
 */



exports.createUserAccount = async(req,res,)  => {
   
    const user = req.body
    // console.log(user);
       
        try{
            const exisitingUsername = await prisma.account.findFirst({
                where:
                 {
                   
                    userName: req.body.userName
                }
             })
             if(!exisitingUsername){

                const hashpw =  await bcrypt.hash(req.body.userPassword1, 10)
                                    
                    try{
                        const newUserAccount = await prisma.account.create({data:
                            {
                                userName: req.body.userName,
                                userEmail: req.body.userEmail,
                                userPassword1: hashpw
                            }
                        
                        })
                        // res.redirect('/user')
                        // console.log(newUserAccount)
                        res.json({message:"new user created"})
                        
                        

                    }catch(error){

                        res.status(500).json({message:'Database connection failed'})

                    }
                  

                 
            }
            else{
                console.log('User found');
                res.status(500).json({message: 'User already Exist'})
            }


        }catch(error){
            console.error('Error while querying the database:', error);
             res.status(500).send('Internal Server Error');
        }

        
   
}