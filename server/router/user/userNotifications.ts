import { Router } from "express"
const router = Router()
// const handleNotifciation = require('../controller/userInfo/handleUserNotifications')
import {getUserNotification} from '../../controller/userInfo/handleUserNotifications'


router.get('/', getUserNotification)


export default router