const express = require('express')
const router = express.Router()
const handleFavorEvent = require('../controller/handleFavorEvent')





router.post('/', handleFavorEvent.userFavorEvent )


module.exports = router

