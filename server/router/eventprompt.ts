import { Router } from "express"
const router = Router()
import handleEvent from '../controller/handleEvent'
import ImageFileUpload from '../Middlware/coverImage'
import authMiddlewareCheck from "../Middlware/authMiddleWare"


router.get('/', authMiddlewareCheck, handleEvent.findEvents)
router.post('/', ImageFileUpload, handleEvent.createEvent )
router.delete('/:id', handleEvent.deleteEvent )


export default router

