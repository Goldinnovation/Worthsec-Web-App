const express = require('express')
const router = express.Router()
const controllerSearchUser = require('../controller/userInfo/handleSearchUser')
const apicache = require('apicache')
let cache = apicache.middleware


router.get('/')
router.get('/:id',cache('5 minutes'),controllerSearchUser.findUserProfilimage)
router.post('/', controllerSearchUser.searchUserbyUser)


module.exports = router