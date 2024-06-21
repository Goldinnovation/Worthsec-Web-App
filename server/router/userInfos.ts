import { Router } from "express";
const router = Router()
import {getUserProfilePicture, createProfilePicutre, deleteUserProfilePicture} from '../controller/userInfo/handleUserInfo'
import userProfilImageFile from "../Middlware/userProfilImage";





router.get('/', getUserProfilePicture)
router.post('/', userProfilImageFile, createProfilePicutre)
router.delete('/:id', deleteUserProfilePicture)


export default router