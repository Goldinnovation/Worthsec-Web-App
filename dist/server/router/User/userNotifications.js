import { Router } from "express";
const router = Router();
import { getCurrentUserNotification } from '../../controller/User/handleUserNotifications.js';
router.get('/', getCurrentUserNotification);
export default router;
