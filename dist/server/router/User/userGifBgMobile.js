import { Router } from "express";
const router = Router();
import uploadGifBgMobile from '../../controller/User/handleUserGifBgMobile.js';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken.js';
router.post('/', DecodeANDVerifyToken, uploadGifBgMobile);
export default router;
