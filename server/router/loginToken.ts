import { Router } from "express"
const router = Router()
// import  userLo from '../controller/handleLoginToken'
import handleLoginEvent from "../controller/handleLoginToken"






router.get('/')
router.post('/', handleLoginEvent.userloginToken)


export default router