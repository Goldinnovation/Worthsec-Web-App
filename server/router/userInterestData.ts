import { Router } from 'express'
const router = Router();
import handlerUserInterestData from '../controller/handleuserInterestData'


router.post('/', handlerUserInterestData )


export default router

