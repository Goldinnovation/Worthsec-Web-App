import { Router } from 'express'
const router = Router();
import handlerUserInterestData from '../controller/handleuserInterestData'
import convertToken from '../Middlware/covertToken';


router.post('/', convertToken , handlerUserInterestData )


export default router























