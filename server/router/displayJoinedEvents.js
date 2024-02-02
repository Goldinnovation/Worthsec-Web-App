const express = require('express')
const router = express.Router()
const handleDisplayJoinedEvent = require('../controller/handledisplayJoinedEvents')



router.get('/',  handleDisplayJoinedEvent.DisplayUserofJoinEvents)
router.post('/', handleDisplayJoinedEvent.DisplaygetEventbyjoinId)



module.exports = router

