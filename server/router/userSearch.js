const express = require('express')
const router = express.Router()
const controllerSearchUser = require('../controller/userInfo/handleSearchUser')
const apicache = require('apicache')



router.get('/')
router.post('/', controllerSearchUser.searchUserbyUser)


module.exports = router