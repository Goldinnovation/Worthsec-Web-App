const express  = require('express');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const {PrismaClient} = require('@prisma/client');
const passport = require('passport')


const prisma = new PrismaClient

module.exports = function(passport){
    passport.use(
        new LocalStrategy( async(username, password, done ) => {
           try{
            const user = await prisma.account.findFirst({    //checks if the user exist in the db 
                where: {
                    userName: username
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
                console.log('password doe snot match ')
                return done(null, false); //Password does not match
            }

           }catch(error){
            console.log('local-strategy error')
            return done('local-strategy error', error)
           }
        })

    
    )
    passport.serializeUser((user, done) => {  //stores the user id in the session 
        done(null, user.userId);
    });
    
    passport.deserializeUser(async(userId, done) => { //retrieves the user from the session with the id and sets it to the req.user 
        try{
            const user = await prisma.account.findUnique({
                where: {
                    id: userId
                    
                }
            })
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