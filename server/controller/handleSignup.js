const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client');
const { id, zhCN } = require('date-fns/locale');



const prisma = new PrismaClient()


exports.createUserAccount = async(req,res)  => {
   
    // console.log(req.body)
    const hashpw =  await bcrypt.hash(req.body.userPassword1, 10)


    
        // console.log(hashpw)
        try{
            const exisitingUsername = await prisma.account.findFirst({
                where:
                 {
                   
                    userName: req.body.userName
                }
             })
             if(!exisitingUsername){
                                    
                    try{
                        const newUserAccount = await prisma.account.create({data:
                            {
                                userName: req.body.userName,
                                userEmail: req.body.userEmail,
                                userPassword1: hashpw,
                                userPassword2: hashpw
                            }
                        
                        })
                        // console.log(newUserAccount)
                        res.json(newUserAccount)
                        
                        

                    }catch(error){

                        res.status(500).send('Db fetch failed')

                    }
                  

                 
            }
            else{
                console.log('User found');
                res.status(404).send('Username already exisit in the db ');
            }


        }catch(error){
            console.error('Error while querying the database:', error);
             res.status(500).send('Internal Server Error');
        }
       



   
}