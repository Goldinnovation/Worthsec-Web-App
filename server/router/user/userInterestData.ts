import { Router } from 'express'
const router = Router();
import handlerUserInterestData from '../../controller/handleuserInterestData'
import CategoryConvertToken from '../../Middlware/User/categoryConverToken';


router.post('/', CategoryConvertToken , handlerUserInterestData )


export default router























