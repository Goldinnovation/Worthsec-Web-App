import { Router } from "express"
const router = Router()
import handleLoginToken from '../controller/handleLoginToken'






router.get('/')
router.post('/', handleLoginToken.userloginToken)


export default router