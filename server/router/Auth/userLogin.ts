import { Router } from "express"
const router = Router()
import handleLog from '../../controller/handleLogin'






router.get('/')
router.post('/', handleLog)


export default router