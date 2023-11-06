const {PrismaClient} = require('@prisma/client');
const passport = require('passport')





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