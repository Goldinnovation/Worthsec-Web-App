const express = require('express')
const router = express.Router()
const handleclosefriendsrequest = require('../controller/handleClosefriendsSearch')






router.get('/:id', handleclosefriendsrequest.searchImgUrl)
router.post('/', handleclosefriendsrequest.searchforClosefriends)


module.exports = router

