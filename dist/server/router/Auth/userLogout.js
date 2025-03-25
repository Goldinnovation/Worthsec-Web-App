import { Router } from "express";
const router = Router();
import handlelogout from '../../controller/Auth/handleLogout.js';
router.get('/', handlelogout);
router.post('/');
export default router;
