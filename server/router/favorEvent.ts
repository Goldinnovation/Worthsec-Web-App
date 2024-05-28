import { Router } from "express"
const router = Router()
import { userFavourEvent } from '../controller/handleFavorEvent'




router.post('/', userFavourEvent)


export default router

