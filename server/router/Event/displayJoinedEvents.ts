import {Router} from "express"
const router = Router()
// const handleDisplayJoinedEvent = require('../controller/handledisplayJoinedEvents')
import {DisplayUserofJoinEvents,  DisplaygetEventbyjoinId} from '../../controller/handledisplayJoinedEvents'

// const apicache = require('apicache')
// let cache = apicache.middleware


router.get('/', DisplayUserofJoinEvents)
router.post('/', DisplaygetEventbyjoinId)

export default router
