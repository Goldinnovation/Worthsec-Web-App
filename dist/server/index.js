import express from 'express';
import eventRequest from './router/Event/eventprompt.js';
import signupRequest from './router/Auth/userSignup.js';
import isAuth from './Middlware/Auth/isAuth.js';
import loginReq from './router/Auth/userLogin.js';
import LoginToken from './router/Auth/loginToken.js';
import logoutReq from './router/Auth/userLogout.js';
import userReq from './router/User/userInfos.js';
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
// import conf from '../next.config.mjs.js';
// import firebaseConfig from './config/firebase.js';
const index = express();
index.use(express.json());
index.use((req, res, next) => {
    if (req.body?.userId) {
        req.user = { userId: req.body.userId }; // Map userId to req.user
    }
    next();
});
index.use('/api/events', eventRequest);
index.use('/api/signUpAcc', signupRequest);
index.use('/api/login', loginReq);
index.use('/api/login-token', LoginToken);
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
index.use('/api/userInterest', userInterestDatarouter);
index.use('/api/eventCategory', userCategoryEventReq);
index.use('/api/favorEventMobile', userFavorEventReqMob);
const port = 4000;
index.listen(port, (err) => {
    if (err)
        throw err;
    console.log(`Ready on http://localhost:${port}`);
});
export default index;
