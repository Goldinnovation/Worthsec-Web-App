const express = require('express')
const router = express.Router()
const handleNotifciation = require('../controller/userInfo/handleUserNotifications')


router.get('/', handleNotifciation.getUserNotification)


module.exports = router