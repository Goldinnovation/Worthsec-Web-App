const express = require('express')
const router = express.Router()
const handleDisplayJoinedEvent = require('../controller/handledisplayJoinedEvents')



router.get('/',  handleDisplayJoinedEvent.DisplayUserofJoinEvents)



module.exports = router

