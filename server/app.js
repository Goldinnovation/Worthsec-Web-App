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
const {PrismaClient} = require('@prisma/client');
const Seqstore = require('connect-session-sequelize')(expressSession.Store)
const connectPgSimple = require("connect-pg-simple");
const cors = require('cors')
const logoutReq = require('./router/userLogout')
const userReq = require('./router/userInfos')
const {initializeApp} = require("firebase/app")
const {getAnalytics} = require("firebase/analytics")
const config = require('./config/firebase')
const searchUserReq = require('./router/userSearch')
const userFollowUser = require('./router/userToUser')
const selectEvents = require('./router/selectedEvents')







const store = new (connectPgSimple(expressSession))({ 
    conObject: {
        connectionString: process.env.DATABASE_URL,
    }, 
    tableName: 'session',
 });

app.prepare().then(() => {
    const server = express()


    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static('public'))
    server.use(cors())
    
    
    server.use(expressSession({
        secret: 'mysecretTestkey',
        store: store,
        resave: false, 
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }, 
        

    }))


    server.use(passport.initialize())
    server.use(passport.session())



    passportConfig(passport)
    // initializeApp(config.firebaseConfig)
    
    // API endpoints 
    server.use('/api/events', eventRequest)
    server.use('/api/signUpAcc',signupRequest)
    server.use('/api/login', loginReq)
    server.use('/api/logout', logoutReq)
    server.use('/api/user', userReq)
    server.use('/user', isAuth)
    server.use('/api/search', searchUserReq )
    server.use('/api/userTouser',userFollowUser)
    server.use('/api/selctedEvents', selectEvents)
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
