import { Router } from "express";
const router = Router()
import { updatetoNewEventData } from "../../controller/Event/handleUpdateToNewExploreData";
import authMiddlewareCheck from "../../Middlware/Auth/authMiddleWare";
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";


router.post('/', CategoryConvertToken, updatetoNewEventData)


export default router

