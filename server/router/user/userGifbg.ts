import { Router } from "express"
const router = Router()
import handleUserGifBg from '../../controller/userInfo/handleUserbg'
import processUserBgGif from '../../Middlware/processUserBgGif'


router.post('/', processUserBgGif, handleUserGifBg.handleuserBackgroundUpload )


export default router

