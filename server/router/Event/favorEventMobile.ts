import { Router } from "express"
const router = Router()
import { userFavoredEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";




router.get('/', CategoryConvertToken, getUserFavoredEvents)

router.post('/', userFavoredEvent)


export default router

