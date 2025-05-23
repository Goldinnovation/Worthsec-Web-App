import React, { useEffect } from 'react'
import style from '@styles/searchStyle/searchpagestyle.module.css'
import { useState } from 'react'


function AddOtherUser(props) {
    const [userFollowArea, setuserFollowArea] = useState(true)
    const [userUnFollowArea, setUserUnFollowArea] = useState(false)
    const [refreshComponent, setRefreshComponenet] = useState(false)
    const [refreshDeleteComponent, setRefreshDeleteComponent] = useState(false)
  

    // Follow other user 
    
  const followUserFetch = async (userIdData) => {
    try {
        console.log("UserIdData:", userIdData)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userTouser`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIdData })

        })
      const data = await res.json()
      console.log("followUserFetch:",data);
      if (res.ok && data.message === "currentUser follows now otherUser") {
        console.log('init');
        setuserFollowArea(false)
        setUserUnFollowArea(true)
        console.log('out');
        setRefreshComponenet(true)
        setRefreshDeleteComponent(false)


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
    <div >
        {userFollowArea && (
            <div className={style["SearchFollowArea"]}>
                    <button  onClick={() => followUserFetch(props.otherUserId)}>Follow</button>
            </div>
        ) }
       
      
    </div>
  )
}

export default AddOtherUser
