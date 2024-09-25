import { Router } from "express";
const router = Router()
import {getUserProfilePicture, createProfilePicutre as createProfilePicture, deleteUserProfilePicture} from '../controller/userInfo/handleUserInfo'
import processProfilImageFile from "../Middlware/userProfilImage";





router.get('/', getUserProfilePicture)
router.post('/', processProfilImageFile, createProfilePicture)
router.delete('/:id', deleteUserProfilePicture)


export default router