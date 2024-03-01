const express = require('express')
const router = express.Router()
const userExploreEvents = require('../controller/handleExploreEvents')
const apicache = require('apicache');
const cache = apicache.middleware;



router.get('/', userExploreEvents.exploreEvents)



module.exports = router

