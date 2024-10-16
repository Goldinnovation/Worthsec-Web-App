import { Router } from "express";
const router = Router()
import { getNewEventData } from "../controller/handlenewExploreData";
import authMiddlewareCheck from "../Middlware/authMiddleWare";
import CategoryConvertToken from "../Middlware/categoryConverToken";


router.post('/', CategoryConvertToken, getNewEventData)


export default router

