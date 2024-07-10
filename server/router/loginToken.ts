import { Router } from "express"
const router = Router()
import handleLoginToken from '../controller/handleLoginToken'






router.get('/')
router.post('/', handleLoginToken)


export default router