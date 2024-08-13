import { Router } from "express";
const router = Router()

import userGetCategoryEvent from "../controller/handleCategoryReq";




router.post('/', userGetCategoryEvent )


export default router

