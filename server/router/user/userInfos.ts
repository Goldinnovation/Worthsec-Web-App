import { Router } from "express";
const router = Router()
import {getUserProfilePicture, getUserProfileImgData as createProfilePicture, deleteUserProfilePicture} from '../../controller/User/handleUserInfo'
import processUserPictureFile from '../../Middlware/User/processUserPicture'




router.get('/', getUserProfilePicture)
router.post('/', processUserPictureFile, createProfilePicture)
router.delete('/:id', deleteUserProfilePicture)


export default router