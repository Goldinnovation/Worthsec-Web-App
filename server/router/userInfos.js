const express = require('express')
const router = express.Router()
const userImage = require('../controller/userInfo/handleUserInfo')
const uploadProfilImage = require('../Middlware/userProfilImage')





router.get('/',)
router.post('/', uploadProfilImage, userImage.userProfilImage)


module.exports = router