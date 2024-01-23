const express = require('express')
const router = express.Router()
const handleSelectedEvents = require('../controller/handleSelectedEvents')




router.post('/', handleSelectedEvents.AllWorldwideEvents )



module.exports = router

