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
const passportConfig = require('./config/passport')
const Auth = require('./Middlware/checksAuth')
const isAuth = require('./Middlware/isAuth')
const loginReq = require('./router/userLogin')
 

app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));



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



    passportConfig(passport)
    
    
    // area for the API endpoints 
    

    server.use('/api/events', eventRequest)
    server.use('/api/signUpAcc',signupRequest)
    server.use('/api/login', loginReq)
    // server.use('/user', )
    // server.use()
    // server.use(`/api/events/${eventid}`, eventRequest)

   
   

    server.all('*', (req,res) => {
        return handle(req,res)

    })

    server.listen(3000, (err) => {
        if(err) throw err; 
        console.log('> Ready on http://localhost:3000')
    })
    
})
