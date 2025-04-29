import { Router } from "express"
const router = Router()
import handlecheckAuth from '../../controller/Auth/handleCheckAuth'
import isAuth from '../../Middlware/Auth/isAuth'




router.get('/:id', isAuth, handlecheckAuth)
router.post('/')


export default router