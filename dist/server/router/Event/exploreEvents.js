import { Router } from "express";
const router = Router();
import { exploreEvents } from '../../controller/Event/handleExploreEvents.js';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare.js';
router.get('/', authMiddlewareCheck, exploreEvents);
export default router;
