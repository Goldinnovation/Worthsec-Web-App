import { Router } from "express"
const router = Router()
import { userFavorEventMobile, getUserFavoredEvents } from '../../controller/handleFavorEventMobile'
import authMiddlewareCheck from "../../Middlware/authMiddleWare";




router.get('/', authMiddlewareCheck, getUserFavoredEvents)

router.post('/', userFavorEventMobile)


export default router

