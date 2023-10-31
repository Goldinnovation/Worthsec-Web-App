
const isAuthenticated = (req,res,next) => {
    if(req.session.user) {
        console.log('user is aUthenticated')
        next(); 

    }else{
        console.log('User is not Auth')
        res.redirect('/login')
    }
} 

module.exports = isAuthenticated;