import { Router } from "express"
const router = Router()
import { userFavoresAnEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";




router.get('/', CategoryConvertToken, getUserFavoredEvents)

router.post('/', userFavoresAnEvent)


export default router

