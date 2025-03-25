import { Router } from "express";
const router = Router();
import handleEvent from '../../controller/Event/handleEvent.js';
import ImageFileUpload from '../../Middlware/coverImage.js';
import authMiddlewareCheck from '../../Middlware/Auth/authMiddleWare.js';
router.get('/', authMiddlewareCheck, handleEvent.findEvents);
router.post('/', ImageFileUpload, handleEvent.createEvent);
router.delete('/:id', handleEvent.deleteEvent);
export default router;
