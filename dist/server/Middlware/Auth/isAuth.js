const isAuthenticated = (req, res, next) => {
    try {
        if (req.user) {
            next();
        }
        else {
            return res.redirect('/');
        }
    }
    catch (error) {
        console.log('Error on Authentication middleware', error);
    }
};
export default isAuthenticated;
