const {PrismaClient} = require('@prisma/client');
const passport = require('passport')




// By clicking the login button the user triggers the API endpoint userlog,
// which checks in the passport authenticatiion if the user exist in the account table 
// if the user exist in the account table the passport authenticator creates a session Id for the user and stores it 
// in the session tableT. Through having the session id the user will be redirect to the main page

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