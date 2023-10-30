const express = require('express')
const router = express.Router()
const handleSignup = require('../controller/handleSignup')





router.get('/')
router.post('/', handleSignup.createUserAccount)


module.exports = router