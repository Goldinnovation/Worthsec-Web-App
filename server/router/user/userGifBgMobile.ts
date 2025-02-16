import { Router } from "express"
const router = Router()
import uploadGifBgMobile from "@/server/controller/User/handleUserGifBgMobile"
import DecodeANDVerifyToken from "@/server/Middlware/User/categoryConverToken"

router.post('/', DecodeANDVerifyToken,  uploadGifBgMobile )


export default router

