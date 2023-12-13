const passport = require('passport');


const checkAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication Error' });
    }
    if (!user) {
      return res.status(401).json('user not found');
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Session error' });
      }
     
      return next(); 
    });
  })(req, res, next);
};


module.exports = checkAuth