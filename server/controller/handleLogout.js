






exports.logout = (req,res) => {
   
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