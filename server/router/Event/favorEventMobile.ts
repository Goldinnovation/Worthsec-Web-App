import { Router } from "express"
const router = Router()
import { userFavorEventMobile, getUserFavoredEvents } from '../../controller/Event/handleFavorEventMobile'
import authMiddlewareCheck from "../../Middlware/Auth/authMiddleWare";




router.get('/', authMiddlewareCheck, getUserFavoredEvents)

router.post('/', userFavorEventMobile)


export default router

