import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'




const fetcher = (url) => fetch(url).then((res) => res.json())

const InviteUsertoEvent = () => {
  
  const [closeFriends, setCloseFriends] = useState(null)
  
  const {data: currentUserCloseFriends, error} = useSWR('http://localhost:3000/api/invite', fetcher)
  
    
  // setCloseFriends(currentUserCloseFriends[0].picture)
  // console.log(currentUserCloseFriends.length)
    return (
    <div>
      <div className='closefriends_Section'>
            {currentUserCloseFriends?.map((event,i) => (
              
                <div key={i} className='closeFriendsInviteSection'>
                    
                    <div className='closefriends_Section'>
                    <div className='closefriends_Content'>
                      <Image src={`/${event.picture.pictureUrl}`}  className= "inviteCloseFriends_ProfilImg" width = {55} height={55} alt='inviteCloseFriends_ProfilImg'/>
                      <div className='closefriends_title' >{event.userName}</div>

                    </div>
                    </div>
                    


                </div>
            ))}
      </div>
    </div>
  )
}

export default InviteUsertoEvent
