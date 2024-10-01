import express from 'express';
import { Application } from 'express';
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
import LoginToken from './router/loginToken'
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
import exploreEvents from './router/exploreEvents'
import userFavorEvent from './router/favorEvent';
import userJoinEvent from './router/userJoinEvent';
import displayUserJoinEvent from './router/displayJoinedEvents';
import searchForCloseFriend from './router/userClosefriends';
import inviteCloseFriends from './router/invitefriends';
import userNotifications from './router/userNotifications'; 
import userInterestDatarouter from './router/userInterestData'
import userCategoryEventReq from './router/userCategory'
import userFavorEventReqMob from './router/favorEventMobile'
import expressSession from "express-session";
import nextConfig from '@/next.config.js';
// import conf from '../next.config.mjs';
// import firebaseConfig from './config/firebase';





const app = express();

app.use(express.json())


app.use('/api/events', eventRequest);
app.use('/api/signUpAcc', signupRequest);
app.use('/api/login', loginReq);
app.use('/api/login-token',LoginToken)
app.use('/api/logout', logoutReq);
app.use('/api/user', userReq);
app.use('/user', isAuth);
app.use('/api/search', searchUserReq);
app.use('/api/userTouser', userFollowUser);
app.use('/api/explore', exploreEvents);
app.use('/api/favorEvent', userFavorEvent);
app.use('/api/JoinEvent', userJoinEvent);
app.use('/api/DisplayJoinedEvent', displayUserJoinEvent);
app.use('/api/searchforclosefriends', searchForCloseFriend);
app.use('/api/invite', inviteCloseFriends);
app.use('/api/notifications', userNotifications);
app.use('/api/userInterest', userInterestDatarouter)
app.use('/api/eventCategory', userCategoryEventReq)
app.use('/api/favorEventMobile', userFavorEventReqMob)




const port = 4000;
app.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
});

export default app
