import { Router } from "express"
const router = Router()
import handleUserGifBg from '../../controller/userInfo/handleUserbg'
import processUserBgGif from '../../Middlware/User/processUserBgGif'


router.post('/', processUserBgGif, handleUserGifBg.handleuserBackgroundUpload )


export default router

