const express = require('express')
const router = express.Router()
const promptcontent = require('../controller/reqPrompt')


router.post('/', promptcontent.postPrompt)



module.exports = router




