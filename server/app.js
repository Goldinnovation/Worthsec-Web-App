const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const dev = process.env.Node_ENV !== 'production'
const app = next({dev})


const handle = app.getRequestHandler()
const eventRequest = require('./router/eventprompt')
const signupRequest = require('./router/userSignup')



app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json())

    // area for the API endpoints of Next

   
    server.use('/api/events',eventRequest)
    server.use('/api/signUpAcc',signupRequest)
    // server.use(`/api/events/${eventid}`, eventRequest)

    server.use(expressSession({
        secret: 'mysecretTestkey',
        resave: false, 
        saveUninitialized: true
    }))
    // router.use(session({
    //     secret: process.env.SECRET || process.env.SECRETKE , 
    //     resave:false, 
    //     saveUninitialized: true, 
    //     store: MongoStore.create(db), 
    //     cookie: {
    //         maxAge: 1000 * 60 *60 *24 
             
    //     },
    //     ttl: 14 * 24 * 60 * 60, 
    //     autoRemove: 'native'
    //     // crypto: {
    //     //     secret: 'squirrel'
    //     // }
    
    // }))
   

    server.all('*', (req,res) => {
        return handle(req,res)

    })

    server.listen(3000, (err) => {
        if(err) throw err; 
        console.log('> Ready on http://localhost:3000')
    })
    
})
