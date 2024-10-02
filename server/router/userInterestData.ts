import { Router } from 'express'
const router = Router();
import handlerUserInterestData from '../controller/handleuserInterestData'
import converToken from '../Middlware/covertToken';


router.post('/',converToken, handlerUserInterestData )


export default router

