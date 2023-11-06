const express = require('express')
const router = express.Router()
const handleEvent = require('../controller/handleEvent')
const ImageFileUpload = require('../Middlware/coverImage')
const   isUserAuth  = require('../Middlware/isAuth')
const Auth = require('../Middlware/checksAuth')




router.get('/', handleEvent.findEvents)
router.post('/', ImageFileUpload, handleEvent.createEvent )
router.delete('/:id', handleEvent.deleteEvent )


module.exports = router

