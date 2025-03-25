import { Router } from "express";
const router = Router();
import handleLoginEvent from '../../controller/Auth/handleLoginToken.js';
router.get('/');
router.post('/', handleLoginEvent.userLoginWithToken);
export default router;
