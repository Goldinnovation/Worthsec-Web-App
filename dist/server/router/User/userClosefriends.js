import { Router } from 'express';
const router = Router();
import { searchImgUrl, searchforClosefriends } from '../../controller/User/handleClosefriendsSearch.js';
router.get('/:id', searchImgUrl);
router.post('/', searchforClosefriends);
export default router;
