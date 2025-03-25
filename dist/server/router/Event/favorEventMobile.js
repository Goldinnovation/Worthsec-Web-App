import { Router } from "express";
const router = Router();
import { userFavorsEvent, getUserFavoredEvents } from '../../controller/Event/handleFavorEvent.js';
// import tokenDecodeAuth from "@/server/Middlware/User/tokenAuthDecoder";
import tokenDecodeAuth from '../../Middlware/User/tokenAuthDecoder.js';
router.get('/', tokenDecodeAuth, getUserFavoredEvents);
router.post('/', userFavorsEvent);
export default router;
