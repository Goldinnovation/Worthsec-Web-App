const express = require('express')
const router = express.Router()
const createNewEvent = require('../controller/createEvent')
const ImageFileUpload = require('../Middlware/coverImage')


router.get('/', createNewEvent.findEvents)
router.post('/', ImageFileUpload, createNewEvent.createEvent )


module.exports = router

