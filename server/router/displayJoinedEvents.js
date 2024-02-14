const express = require('express')
const router = express.Router()
const handleDisplayJoinedEvent = require('../controller/handledisplayJoinedEvents')
const apicache = require('apicache')
let cache = apicache.middleware


router.get('/',handleDisplayJoinedEvent.DisplayUserofJoinEvents)
router.post('/', handleDisplayJoinedEvent.DisplaygetEventbyjoinId)



module.exports = router

