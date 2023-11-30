const express = require('express')
const router = express.Router()
const userImage = require('../controller/userInfo/handleUserInfo')
const uploadProfilImage = require('../Middlware/userProfilImage')





router.get('/', userImage.getUserProfilimage)
router.post('/', uploadProfilImage, userImage.userProfilImage)
router.delete('/:id', userImage.deleteUserProfilImage)


module.exports = router