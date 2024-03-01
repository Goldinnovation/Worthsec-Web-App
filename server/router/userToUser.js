const express = require('express')
const router = express.Router()
const handleUsertoFollow = require('../controller/userInfo/handleUserToUser')
const apicache = require('apicache')
let cache = apicache.middleware



router.get('/')
router.get('/:id',handleUsertoFollow.searchUser_friends)
router.post('/', handleUsertoFollow.followUser)
router.delete('/', handleUsertoFollow.unFollowUser)


module.exports = router