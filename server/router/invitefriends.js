const express = require('express')
const router = express.Router()
const handleInviteCloseFriends  = require('../controller/handleInviteToFriends')




// router.post('/', handleFavorEvent.userFavorEvent )
router.get('/', handleInviteCloseFriends.getCloseFriends)
router.post('/', handleInviteCloseFriends.inviteClosefriendsToEvent)

module.exports = router

