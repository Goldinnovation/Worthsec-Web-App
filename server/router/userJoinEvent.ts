import { Router } from 'express'
const router = Router();
import handleUserJoinEvent from '../controller/handleJoinEvents'



router.post('/', handleUserJoinEvent)


export default router

