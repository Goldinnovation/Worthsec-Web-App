const express = require('express')
const router = express.Router()
const userController = require('../controller/userInfo/handleUserInfo')
const uploadProfilImage = require('../Middlware/userProfilImage')





router.get('/', userController.getUserProfilePicture)
router.post('/', uploadProfilImage, userController.createProfilePicutre)
router.delete('/:id', userController.deleteUserProfilePicture)


module.exports = router