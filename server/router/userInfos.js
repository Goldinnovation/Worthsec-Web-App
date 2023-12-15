const express = require('express')
const router = express.Router()
const userController = require('../controller/userInfo/handleUserInfo')
const uploadProfilImage = require('../Middlware/userProfilImage')





router.get('/', userController.getUserProfilimage,)
router.post('/', uploadProfilImage, userController.getUserbyUser, userController.userProfilImage)
// router.post('/:i',userImage.getUserbyUser)
router.delete('/:id', userController.deleteUserProfilImage)


module.exports = router