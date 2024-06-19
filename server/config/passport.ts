import {PassportStatic} from 'passport';
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy} from 'passport-local'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Express } from 'express';

interface User{
    id: string,
    userId: string, 
    userEmail: string, 
    userPassword1: string
    
}




export default function(passport: PassportStatic){
    passport.use(
        new LocalStrategy({usernameField: 'loginEmail', passwordField: 'loginPassword'},async(username: string, password: string, done: (Error: any, user?: Express.User | false, options?: { message: string }) => void ) => {
            console.log('Local strategy is triggered');
           try{
            const user = await prisma.account.findFirst({    //checks if the user exist in the db 
                where: {
                    userEmail: username
                }
            }); 
            if(!user){
                return done(null,false); //user not found
            }

            const checkPasswordMatch = await bcrypt.compare(password, user.userPassword1);

            if(checkPasswordMatch){
                console.log('Authentication successful')
                return done(null, user); // Authentication was successful
            }
            else{
                console.log('password does snot match ')
                return done(null, false); //Password does not match
            }

           }catch(error: any){
            console.log('local-strategy error')
            if (error instanceof Error) {
                return done(error);
              } else {
                return done(new Error('An unknown error occurred'));
              }
           }
        })

    
    )

    
    passport.serializeUser((user: Express.User | false, done:(err: any, id?: string) => void ) => {  //stores the user id in the session 
       console.log('catch seq')
        done(null,( user as User).userId);
    });
    
    passport.deserializeUser(async(userId: string, done: (err: any, user?: Express.User | false) => void) => { //retrieves the user from the session with the id and sets it to the req.user 
        try{
            const user = await prisma.account.findUnique({
                where: {
                    userId: userId
                    
                }
            })

            // console.log(user)
            if(!user){
                console.error('User not found');
                return done(new Error('User not found'))
            }

            done(null, user)
           

        }catch(error)
        {
            console.error('Deserialize user error:', error);
            done(error)
        }
    })

}