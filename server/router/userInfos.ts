import { Router } from "express";
const router = Router();
// const userController = require('../controller/userInfo/handleUserInfo')
// import {getUserProfilePicture, createProfilePicutre, deleteUserProfilePicture} from '../controller/userInfo/handleUserInfo'
import {getUserProfilePicture, createProfilePicutre, deleteUserProfilePicture} from '../controller/userInfo/handleUserInfo'
import userProfilImageFile from "../Middlware/userProfilImage";
// const uploadProfilImage = require('../Middlware/userProfilImage')





router.get('/', getUserProfilePicture)
router.post('/', userProfilImageFile, createProfilePicutre)
router.delete('/:id', deleteUserProfilePicture)


export default router