const express = require('express')
const router = express.Router()
const handleUsertoFollow = require('../controller/userInfo/handleUserToUser')




router.get('/')
router.get('/:id', handleUsertoFollow.searchUser_friends)
router.post('/', handleUsertoFollow.followUser)


module.exports = router