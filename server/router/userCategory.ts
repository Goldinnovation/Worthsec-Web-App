import { Router } from "express";
const router = Router()

import userGetCategoryEvent from "../controller/handleCategoryReq";




router.get('/', userGetCategoryEvent )


export default router

