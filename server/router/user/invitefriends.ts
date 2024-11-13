import { Router } from "express"
const router = Router()
import {checkForUsersCloseFriends, inviteClosefriendsToEvent} from '../../controller/User/handleInviteToFriends'




// router.post('/', handleFavorEvent.userFavorEvent )
router.get('/', checkForUsersCloseFriends)
router.post('/', inviteClosefriendsToEvent)

export default router
