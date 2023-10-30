const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const dev = process.env.Node_ENV !== 'production'
const app = next({dev})
const passport = require('passport')
const handle = app.getRequestHandler()
const eventRequest = require('./router/eventprompt')
const signupRequest = require('./router/userSignup')
const passportconfig = require('./config/passport')
const Auth = require('./Middlware/checksAuth')
 

app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json())
    server.use(expressSession({
        secret: 'mysecretTestkey',
        resave: false, 
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
    server.use(passport.initialize())
    server.use(passport.session())
    passportconfig(passport)
    
    // area for the API endpoints 
    server.use('/user', Auth)
    server.use('/api/events',eventRequest)
    server.use('/api/signUpAcc',signupRequest)
    // server.use(`/api/events/${eventid}`, eventRequest)

   
   

    server.all('*', (req,res) => {
        return handle(req,res)

    })

    server.listen(3000, (err) => {
        if(err) throw err; 
        console.log('> Ready on http://localhost:3000')
    })
    
})
