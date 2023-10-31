const express = require('express')
const router = express.Router()
const handleLog = require('../controller/handleLogin')
const Auth = require('../Middlware/checksAuth')






router.get('/' )
router.post('/', Auth, handleLog.userlog)


module.exports = router