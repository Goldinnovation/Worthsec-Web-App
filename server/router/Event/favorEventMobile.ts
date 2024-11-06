import { Router } from "express"
const router = Router()
import { userFavorEventMobile, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";




router.get('/', CategoryConvertToken, getUserFavoredEvents)

router.post('/', userFavorEventMobile)


export default router

