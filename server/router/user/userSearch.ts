import { Router } from "express"
const router = Router()
import {searchUserbyUser} from '../../controller/userInfo/handleSearchUser'



router.get('/')
router.post('/', searchUserbyUser)


export default router