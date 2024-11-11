import {Router} from "express"
const router = Router()
// const handleDisplayJoinedEvent = require('../controller/handledisplayJoinedEvents')
import {getUserJoinedEvents} from '../../controller/Event/handledisplayJoinedEvents'

// const apicache = require('apicache')
// let cache = apicache.middleware


router.get('/', getUserJoinedEvents)

export default router
