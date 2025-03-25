import { Router } from "express";
const router = Router();
import handleUserGifBg from '../../controller/User/handleUserbg.js';
import processUserBgGif from '../../Middlware/User/processUserBgGif.js';
router.post('/', processUserBgGif, handleUserGifBg.processUserBackgroundGifImage);
export default router;
