import { Router } from "express";
const router = Router();
import { searchUserbyUser } from '../../controller/User/handleSearchUser.js';
router.get('/');
router.post('/', searchUserbyUser);
export default router;
