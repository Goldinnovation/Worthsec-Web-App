import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import passport from 'passport';
import eventRequest from './router/Event/eventprompt.js';
import signupRequest from './router/Auth/userSignup.js';
import passportConfig from './config/passport.js';
import isAuth from './Middlware/Auth/isAuth.js';
import loginReq from './router/Auth/userLogin.js';
import LoginToken from './router/Auth/loginToken.js';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import logoutReq from './router/Auth/userLogout.js';
import userProfilePicture from './router/User/userInfos.js';
import { initializeApp } from 'firebase/app';
import config from './config/firebase.js';
import searchUserReq from './router/User/userSearch.js';
import userFollowUser from './router/User/userToUser.js';
import exploreEvents from './router/Event/exploreEvents.js';
import userJoinEvent from './router/Event/userJoinEvent.js';
import displayUserJoinEvent from './router/Event/displayJoinedEvents.js';
import searchForCloseFriend from './router/User/userClosefriends.js';
import inviteCloseFriends from './router/User/invitefriends.js';
import userNotifications from './router/User/userNotifications.js';
import userInterestDatarouter from './router/User/userInterestData.js';
import userCategoryEventReq from './router/Event/userCategory.js';
import userFavorEventReqMob from './router/Event/favorEventMobile.js';
import newExploreEventData from './router/Event/newExploreData.js';
import uploadUserBackground from './router/User/userGifbg.js';
import UserDataMobile from './router/User/userDataMobile.js';
import userQRRequest from './router/User/userQrRequest.js';
import expressSession from "express-session";
import uploadMobileUserProfilePicture from './router/User/userProfilePictureMobileUpload.js';
import uploadUserGifBgMobile from './router/User/userGifBgMobile.js';
const store = new (connectPgSimple(expressSession))({
    conObject: {
        connectionString: process.env.DATABASE_URL,
    },
    tableName: 'session',
});
const devEnv = process.env.NODE_ENV !== 'production';
const app = next({ dev: devEnv });
const handle = app.getRequestHandler();
const server = express();
app.prepare().then(() => {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(express.static('public'));
    server.use(cors());
    server.use(express.json());
    server.disable('view cache');
    server.use(expressSession({
        secret: 'mysecretTestkey',
        store: store,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    passportConfig(passport);
    initializeApp(config.firebaseConfig);
    // getStorage(fireapp)
    // getFirestore(fireapp)
    // API endpoints
    server.use('/api/events', eventRequest);
    server.use('/api/signUpAcc', signupRequest);
    server.use('/api/login', loginReq);
    server.use('/api/login-token', LoginToken);
    server.use('/api/logout', logoutReq);
    server.use('/api/user', userProfilePicture);
    server.use('/user', isAuth);
    server.use('/api/search', searchUserReq);
    server.use('/api/userTouser', userFollowUser);
    server.use('/api/explore', exploreEvents);
    server.use('/api/JoinEvent', userJoinEvent);
    server.use('/api/DisplayJoinedEvent', displayUserJoinEvent);
    server.use('/api/searchforclosefriends', searchForCloseFriend);
    server.use('/api/invite', inviteCloseFriends);
    server.use('/api/notifications', userNotifications);
    server.use('/api/userInterest', userInterestDatarouter);
    server.use('/api/eventCategory', userCategoryEventReq);
    server.use('/api/favorEventMobile', userFavorEventReqMob);
    server.use('/api/newExploreEventData', newExploreEventData);
    server.use('/api/uploadUserBackground', uploadUserBackground);
    server.use('/api/userData', UserDataMobile);
    server.use('/api/userQRRequest', userQRRequest);
    server.use('/api/userProfilePictureMobileUpload', uploadMobileUserProfilePicture);
    server.use('/api/uploadGifBgMobile', uploadUserGifBgMobile);
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    const port = 3000;
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`Ready on http://localhost:${port}`);
    });
});
export default server;
