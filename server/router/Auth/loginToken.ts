import { Router } from "express"
const router = Router()
// import  userLo from '../controller/handleLoginToken'
import handleLoginEvent from "../../controller/Auth/handleLoginToken"






router.get('/')
router.post('/', handleLoginEvent.userLoginWithToken)


export default router