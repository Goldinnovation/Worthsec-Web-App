import { Router } from "express";
const router = Router()
import userGetCategoryEvent from "../../controller/Event/handleEventCategoryReq";
import CategoryConvertToken from "../../Middlware/User/categoryConverToken";




router.post('/', CategoryConvertToken, userGetCategoryEvent )


export default router

