import { Router } from "express";
const router = Router();
import { updatetoNewEventData } from '../../controller/Event/handleUpdateToNewExploreData.js';
import DecodeANDVerifyToken from '../../Middlware/User/categoryConverToken.js';
router.post('/', DecodeANDVerifyToken, updatetoNewEventData);
export default router;
