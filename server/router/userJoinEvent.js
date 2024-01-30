const express = require('express')
const router = express.Router()
const handleUserJoinEvent = require('../controller/handleJoinEvents')





router.post('/', handleUserJoinEvent.userJoinEvent)


module.exports = router

