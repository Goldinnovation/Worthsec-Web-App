const express = require('express')
const router = express.Router()
const handleExploreEvents = require('../controller/handleSelectedEvents')
const apicache = require('apicache');
const cache = apicache.middleware;



router.get('/', handleExploreEvents.exploreEvents)



module.exports = router

