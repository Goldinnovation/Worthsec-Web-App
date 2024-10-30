import { Router } from "express";
const router = Router()
import { updatetoNewEventData } from "../../controller/handlenewExploreData";
import authMiddlewareCheck from "../../Middlware/authMiddleWare";
import CategoryConvertToken from "../../Middlware/categoryConverToken";


router.post('/', CategoryConvertToken, updatetoNewEventData)


export default router

