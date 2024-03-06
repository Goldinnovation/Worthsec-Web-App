




/** 
 * Purpose Statement--logout
    By pressing the logout button, the API endpoint logout will be triggert and execute the logout handler logic. 
    This function check first if the user which makes the request ist Authenticatedm, if this true it will execute the logout function from passport. 
    This execution will elimanat the current user authentican. Throughtout this process the user will be redirected to the login page-
/**
 * Function Signature--logout
 * @param {object} req - represents the current users request. 
 */

exports.logout = (req,res) => {
   console.log(req)
    if(req.isAuthenticated()){
        console.log('inside Logout')
       req.logout(function(err){
        if(err){
            console.log(err)
            return next(err)
        }else{
            console.log('user is logged out')
            return res.status(200).json({message: 'user is logged out'})
        }
        
       })

    }else{
        return res.json({message: 'falied to logout'})
    }

  


}