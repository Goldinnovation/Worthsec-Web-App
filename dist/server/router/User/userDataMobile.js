import { Router } from "express";
const router = Router();
import handleUserData from '../../controller/User/handleUserData.js';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare.js';
router.get('/', authMiddlewareCheck, handleUserData.handleUserDataInfoReq);
export default router;
