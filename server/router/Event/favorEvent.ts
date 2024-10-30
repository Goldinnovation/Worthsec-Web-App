import { Router } from "express"
const router = Router()
import { userFavourEvent } from '../../controller/Event/handleFavorEvent'




router.post('/', userFavourEvent)


export default router

