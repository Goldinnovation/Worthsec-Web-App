const express = require('express')
const router = express.Router()
const controllerSearchUser = require('../controller/userInfo/handleSearchUser')
const { ro } = require('date-fns/locale')




router.get('/')
router.get('/:id',controllerSearchUser.findUserProfilimage)
router.post('/', controllerSearchUser.searchUserbyUser)


module.exports = router