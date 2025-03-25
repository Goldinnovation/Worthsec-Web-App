import { Router } from "express";
const router = Router();
import hanldeUserQRCodeReqData from '../../controller/User/handleUserQrRequest.js';
import decodingBtoa from '../../Middlware/User/decodingbtoa.js';
router.get('/', decodingBtoa, hanldeUserQRCodeReqData);
export default router;
