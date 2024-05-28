const express = require('express')
const router = express.Router()
// const handleUserJoinEvent = require('../controller/handleJoinEvents')
import handleUserJoinEvent from '../controller/handleJoinEvents'



router.post('/', handleUserJoinEvent)


export default router

