import { Router } from "express"
const router = Router()
import handleSignup from '../controller/handleSignup'
// const   isUserAuth  = require('../Middlware/isAuth')



router.get('/')
router.post('/', handleSignup)


export default router