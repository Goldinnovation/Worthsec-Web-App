import { Router } from "express";
const router = Router()
import userGetCategoryEvent from "../controller/handleEventCategoryReq";
import CategoryConvertToken from "../Middlware/categoryConverToken";




router.post('/', CategoryConvertToken, userGetCategoryEvent )


export default router

