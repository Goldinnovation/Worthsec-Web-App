
import { Router } from 'express'
const router = Router()
import {searchImgUrl, searchforClosefriends as handleclosefriendsrequest, searchforClosefriends} from '../controller/handleClosefriendsSearch'




router.get('/:id', searchImgUrl)
router.post('/', searchforClosefriends)


export default router

