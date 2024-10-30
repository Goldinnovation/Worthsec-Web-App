import { Router } from "express"
const router = Router()
// const handleUsertoFollow = require('../controller/userInfo/handleUserToUser')
import {searchUser_friends,followUser, unFollowUser} from '../controller/userInfo/handleUserToUser'
// const apicache = require('apicache')
// let cache = apicache.middleware



// router.get('/')
router.get('/:id', searchUser_friends)
router.post('/', followUser)
router.delete('/', unFollowUser)


export default router