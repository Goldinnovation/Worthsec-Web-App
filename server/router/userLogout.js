const express = require('express')
const router = express.Router()
const handlelogout = require('../controller/handleLogout')
const   isUserAuth  = require('../Middlware/isAuth')







router.get('/', handlelogout.logout)
router.post('/')


module.exports = router