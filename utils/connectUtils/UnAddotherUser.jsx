import React from 'react'
import { useState, useEffect } from 'react'
import style from '@styles/searchStyle/searchpagestyle.module.css'


function UnAddotherUser(props) {
    
    const [userUnFollowArea, setUserUnFollowArea] = useState(false)
    const [refreshComponent, setRefreshComponenet] = useState(false)
    const [refreshDeleteComponent, setRefreshDeleteComponent] = useState(false)


  // unfollow the user 
  const UnFollowUserFetch = async (unFollowUserId,userNotificationId) => {

    try {
      const res = await fetch(`http://localhost:3000/api/userTouser`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            unFollowUserId,
          userNotificationId })

        })

      const data = await res.json()

      if (res.ok && data.message === "User unFollowed user") {
        setuserFollowArea(true)
        setUserUnFollowArea(false)
        console.log('Delete is called');
        setRefreshDeleteComponent(true)
        setRefreshComponenet(false)


      } else if (!res.ok) {
        console.log('Res error')
        throw new Error(`fetch res Error: ${res.status} ${res.statusText}`)
      }





    } catch (error) {
      console.error('fetch userID error for followUserFetch', error)
      throw error
    }

  }

  useEffect(() => {

  }, [props.otherUserId, refreshComponent, refreshDeleteComponent])

  return (
    <div>
         {userUnFollowArea && (
                         
            <div className={style["SearchFollowArea"]}>
              <button onClick={() => UnFollowUserFetch(props.unfollowotherUserId, props.notificationId)}>Unfollow</button>
            </div>
        )}
      
    </div>
  )
}

export default UnAddotherUser
