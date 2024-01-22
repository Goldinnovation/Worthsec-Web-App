const express = require('express')
const router = express.Router()
const handleUsertoFollow = require('../controller/userInfo/handleUserToUser')




router.get('/')
router.post('/', handleUsertoFollow.userToUser)


module.exports = router