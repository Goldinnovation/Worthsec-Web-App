const express = require('express')
const router = express.Router()
const handleSelectedEvents = require('../controller/handleSelectedEvents')
const apicache = require('apicache');
const cache = apicache.middleware;



router.post('/', handleSelectedEvents.searchedUserEvent)



module.exports = router

