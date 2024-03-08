import React, { useState } from 'react'
import useSWR from 'swr'




const fetcher = (url) => fetch(url).then((res) => res.json())

const InviteUsertoEvent = () => {
  
  const [closeFriends, setCloseFriends] = useState(null)
  
  const {data: currentUserCloseFriends, error} = useSWR('http://localhost:3000/api/invite', fetcher)
  
    
  console.log(currentUserCloseFriends)
    return (
    <div>
            {currentUserCloseFriends?.map((event,i) => (
                <div key={i} className='closeFriendsInviteSection'>
                   
                    <div>{event.userName}kjj</div>

                </div>
            ))}
            {/* nmkjkdsd */}
    </div>
  )
}

export default InviteUsertoEvent
