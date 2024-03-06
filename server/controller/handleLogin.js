const {PrismaClient} = require('@prisma/client');
const passport = require('passport')







/** 
 * Purpose Statement--userlog
 *By clicking the login button the user triggers the API endpoint userlog.
 *The endpoint executes the passport authenticatiion, which verfies if the user information exist the  in the account database table 
 *if the user exist in the account database table the passport authenticator creates a session Id for the user and stores it 
 *in the session database table and cookie. Throughthe session id the user will be redirect to the main page
*/

/**
 * Function Signature--findUserProfilimage
 * @param {object} user - represents the users information such as email and password 
 * @returns {object} Returns a json object message as approval or declined
 */


exports.userlog = (req,res,next) => {
    
    passport.authenticate('local', (err, user, info) => {
    if (err) {
        console.log('error')
      return res.status(500).json({ message: 'Authentication Error' });
    }
    if (!user) {
        console.log('user not found')
      return res.status(401).json('user not found');
    }
    req.login(user, (err) => {
      if (err) {
        console.log('user not catched')
        return res.status(500).json({ message: 'Session error' });
      }
      console.log('user catched')
     res.json({message: "Login Successful"}) 
    });
  })(req, res, next);

    

   

  
}