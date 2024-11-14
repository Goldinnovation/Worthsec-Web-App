import express from 'express';
import { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import dev from 'process';
import passport from 'passport';
import eventRequest from './router/Event/eventprompt';
import signupRequest from './router/Auth/userSignup';
import passportConfig from './config/passport';
import isAuth from './Middlware/Auth/isAuth';
import loginReq from './router/Auth/userLogin';
import LoginToken from './router/Auth/loginToken'
import { PrismaClient } from '@prisma/client';
import Seqstore from 'connect-session-sequelize';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import logoutReq from './router/Auth/userLogout';
import userReq from './router/User/userInfos';
import { initializeApp } from 'firebase/app';
import config from './config/firebase';
import searchUserReq from './router/User/userSearch';
import userFollowUser from './router/User/userToUser';
import exploreEvents from './router/Event/exploreEvents'
import userJoinEvent from './router/Event/userJoinEvent';
import displayUserJoinEvent from './router/Event/displayJoinedEvents';
import searchForCloseFriend from './router/User/userClosefriends';
import inviteCloseFriends from './router/User/invitefriends';
import userNotifications from './router/User/userNotifications'; 
import userInterestDatarouter from './router/User/userInterestData'
import userCategoryEventReq from './router/Event/userCategory'
import userFavorEventReqMob from './router/Event/favorEventMobile'
import newExploreEventData from './router/Event/newExploreData'
import uploadUserBackground from './router/User/userGifbg'
import expressSession from "express-session";

import nextConfig from '@/next.config.js';
// import conf from '../next.config.mjs';
// import firebaseConfig from './config/firebase';




const index = express();

index.use(express.json())


index.use('/api/events', eventRequest);
index.use('/api/signUpAcc', signupRequest);
index.use('/api/login', loginReq);
index.use('/api/login-token',LoginToken)
index.use('/api/logout', logoutReq);
index.use('/api/user', userReq);
index.use('/user', isAuth);
index.use('/api/search', searchUserReq);
index.use('/api/userTouser', userFollowUser);
index.use('/api/explore', exploreEvents);
index.use('/api/JoinEvent', userJoinEvent);
index.use('/api/DisplayJoinedEvent', displayUserJoinEvent);
index.use('/api/searchforclosefriends', searchForCloseFriend);
index.use('/api/invite', inviteCloseFriends);
index.use('/api/notifications', userNotifications);
index.use('/api/userInterest', userInterestDatarouter)
index.use('/api/eventCategory', userCategoryEventReq)
index.use('/api/favorEventMobile', userFavorEventReqMob)




const port = 4000;
index.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
});

export default index
