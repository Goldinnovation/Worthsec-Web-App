const express = require('express')
const router = express.Router()
const handleUsertoFollow = require('../controller/handleuserFollow')




router.get('/')
router.post('/', handleUsertoFollow.userFollowOtherUser)


module.exports = router