import { Router } from "express";
const router = Router()
import {getUserProfilePicture, createProfilePicutre as createProfilePicture, deleteUserProfilePicture} from '../controller/userInfo/handleUserInfo'
// import processProfilImageFile from "../Middlware/userProfilImage";
import processUserPictureFile from '../Middlware/processUserPicture'




router.get('/', getUserProfilePicture)
router.post('/', processUserPictureFile, createProfilePicture)
router.delete('/:id', deleteUserProfilePicture)


export default router