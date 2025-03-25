import { Router } from 'express';
const router = Router();
import handlerUserInterestData from '../../controller/User/handleuserInterestData.js';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken.js';
router.post('/', DecodeANDVerifyToken, handlerUserInterestData);
export default router;
