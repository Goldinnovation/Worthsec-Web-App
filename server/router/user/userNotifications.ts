import { Router } from "express"
const router = Router()
// const handleNotifciation = require('../controller/userInfo/handleUserNotifications')
import {getCurrentUserNotification} from '../../controller/User/handleUserNotifications'


router.get('/', getCurrentUserNotification)


export default router