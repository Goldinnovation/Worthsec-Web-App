import { Router } from "express"
const router = Router()
import { userFavorsEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent'
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";




router.get('/', CategoryConvertToken, getUserFavoredEvents)

router.post('/', userFavorsEvent)


export default router

