import { Router } from "express";
const router = Router();
import userGetCategoryEvent from '../../controller/Event/handleEventCategoryReq.js';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken.js';
router.post('/', DecodeANDVerifyToken, userGetCategoryEvent);
export default router;
