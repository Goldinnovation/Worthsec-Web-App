
const isAuthenticated = (req,res,next) => {
    if(req.user) {
        // console.log(req.user)
    
        // console.log('user is aUthenticated')
        next(); 

    }else{
        console.log('User is not Auth')
        return res.redirect('/login')
    }
} 

module.exports = isAuthenticated;