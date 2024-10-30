import { Router } from "express";
const router = Router()
import { updatetoNewEventData } from "../../controller/handlenewExploreData";
import authMiddlewareCheck from "../../Middlware/Auth/authMiddleWare";
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";


router.post('/', CategoryConvertToken, updatetoNewEventData)


export default router

