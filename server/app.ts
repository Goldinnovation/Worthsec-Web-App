import express from 'express';
import { Request, Response, NextFunction } from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import dev from 'process';
import passport from 'passport';
import eventRequest from './router/eventprompt';
import signupRequest from './router/userSignup';
import passportConfig from './config/passport';
import isAuth from './Middlware/isAuth';
import loginReq from './router/userLogin';
import { PrismaClient } from '@prisma/client';
import Seqstore from 'connect-session-sequelize';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import logoutReq from './router/userLogout';
import userReq from './router/userInfos';
import { initializeApp } from 'firebase/app';
import config from './config/firebase';
import searchUserReq from './router/userSearch';
import userFollowUser from './router/userToUser';
import exploreEvents from './router/selectedEvents';
import userFavorEvent from './router/favorEvent';
import userJoinEvent from './router/userJoinEvent';
import displayUserJoinEvent from './router/displayJoinedEvents';
import searchForCloseFriend from './router/userClosefriends';
import inviteCloseFriends from './router/invitefriends';
import userNotifications from './router/userNotifications';
import expressSession from "express-session";
import { log } from 'console';





// const { conObject } = require('connect-pg-simple');

const store = new (connectPgSimple(expressSession))({
    conObject: {
        connectionString: process.env.DATABASE_URL,
    },
    tableName: 'session',
});

const devEnv = process.env.NODE_ENV !== 'production';
const app = next({ dev: devEnv });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static('public'));
    server.use(cors());
    server.disable('view cache');

    server.use(
        expressSession({
            secret: 'mysecretTestkey',
            store: store,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        })
    );

    server.use(passport.initialize());
    server.use(passport.session());

    passportConfig(passport);
    initializeApp(config.firebaseConfig);

    // API endpoints
    server.use('/api/events', eventRequest);
    server.use('/api/signUpAcc', signupRequest);
    server.use('/api/login', loginReq);
    server.use('/api/logout', logoutReq);
    server.use('/api/user', userReq);
    server.use('/user', isAuth);
    server.use('/api/search', searchUserReq);
    server.use('/api/userTouser', userFollowUser);
    server.use('/api/explore', exploreEvents);
    server.use('/api/favorEvent', userFavorEvent);
    server.use('/api/JoinEvent', userJoinEvent);
    server.use('/api/DisplayJoinedEvent', displayUserJoinEvent);
    server.use('/api/searchforclosefriends', searchForCloseFriend);
    server.use('/api/invite', inviteCloseFriends);
    server.use('/api/notifications', userNotifications);
  

    server.all('*',  (req: Request, res: Response) => {
      
            return handle(req,res)
        } );

    const port = 3000;
    server.listen(port, (err?: Error) => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${port}`);
    });
});