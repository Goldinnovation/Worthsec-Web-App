const express = require('express')
const router = express.Router()
const handleEvent = require('../controller/handleEvent')
const ImageFileUpload = require('../Middlware/coverImage')




router.get('/', handleEvent.findEvents)
router.post('/', ImageFileUpload, handleEvent.createEvent )
router.delete('/:id', handleEvent.deleteEvent )


module.exports = router

