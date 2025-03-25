import { Router } from 'express';
const router = Router();
import handleUserJoinEvent from '../../controller/Event/handleJoinEvents.js';
router.post('/', handleUserJoinEvent);
export default router;
