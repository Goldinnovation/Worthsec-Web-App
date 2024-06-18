const express = require('express')
import { Router } from "express"
const router = Router()
import handleEvent from '../controller/handleEvent'
// const handleEvent = require('../controller/handleEvent')
// const ImageFileUpload = require('../Middlware/coverImage')
import ImageFileUpload from '../Middlware/coverImage'



router.get('/', handleEvent.findEvents)
router.post('/', ImageFileUpload, handleEvent.createEvent )
router.delete('/:id', handleEvent.deleteEvent )


module.exports = router

