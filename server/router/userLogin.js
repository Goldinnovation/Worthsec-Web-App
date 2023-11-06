const express = require('express')
const router = express.Router()
const handleLog = require('../controller/handleLogin')
const Auth = require('../Middlware/checksAuth')
const   isUserAuth  = require('../Middlware/isAuth')






router.get('/' )
router.post('/', handleLog.userlog)


module.exports = router