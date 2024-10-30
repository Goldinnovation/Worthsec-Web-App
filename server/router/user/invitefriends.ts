import { Router } from "express"
const router = Router()
import {getCloseFriends, inviteClosefriendsToEvent} from '../controller/handleInviteToFriends'




// router.post('/', handleFavorEvent.userFavorEvent )
router.get('/', getCloseFriends)
router.post('/', inviteClosefriendsToEvent)

export default router
