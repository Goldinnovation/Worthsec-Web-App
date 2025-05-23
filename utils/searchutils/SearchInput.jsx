"use client"
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import React, { useEffect, useState } from 'react'
import useSWR, { preload } from 'swr'
import Image from 'next/image'
import { debounce } from 'lodash'
import Gift from '@assets/3YKw.gif'





const queryUser = async (searchValue) => {
  try {
    const res = await fetch(`http://localhost:3000/api/search`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchValue })

    })
    if (!res.ok) {
      throw new Error('Invalid res')
    }
    const data = await res.json()
    return data

  } catch (error) {
    console.log('Fail to send information ');

  }

}




// const getqueriedUser = async (userIdData) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/search/${userIdData}`, {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//       },


//     })
//     if (!res.ok) {
//       throw new Error('Invalid res')
//     }
//     const data = await res.json()
//     return data


//   } catch (error) {
//     // throw new Error(error, "Fetch Error on requesting User on search")
//     console.log("Fetch Error getting User on search", error)
//     throw error;


//   }

// }





const SearchInput = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState([])
  const [userIdData, setUserIdData] = useState("");
  const [userProfilImage, setUserProfilImage] = useState(null)
  const [userFollowArea, setuserFollowArea] = useState(true)
  const [userUnFollowArea, setUserUnFollowArea] = useState(false)
  // const [userfriendsData, setuserFriendsData] = useState(null)
  const [userFriendsId, setuserFriendId] = useState(null)
  const [userNotification, setUserNotificaton] = useState(null)
  const [refreshComponent, setRefreshComponenet] = useState(false)
  const [refreshDeleteComponent, setRefreshDeleteComponent] = useState(false)


  // const handleChange = async(e) => {
  //   const value = e.target.value
  //   setSearchValue(value)

  // }




  const checkifUserexist = async (userIdData) => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userTouser/${userIdData}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await res.json()
       console.log(data.length);
      if (res.ok && data.length === 1) {
        setUserUnFollowArea(true)
        setuserFollowArea(false)


      } else if (res.ok && data.length === 0) {
        setUserUnFollowArea(false)
        setuserFollowArea(true)

      }
      else if (!res.ok) {
        throw new Error(' Error: Bad response')
      }

      return data


    } catch (error) {
      console.log('Error checking if user exist', error)
    }

  }


  // follow the user 

  const followUserFetch = async (userIdData) => {
    try {
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


  // unfollow the user 
  const UnFollowUserFetch = async (unFollowUserId,userNotificationId) => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userTouser`,
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




  // controlles if the userIdData has a character if true it retrieves the the user picture_id data

  useEffect(() => {

    const fetchUserPic = async () => {

      if (userIdData !== "") {
       
        try {
         console.log("refresh");
          const checkifexitasFriend = await checkifUserexist(userIdData) 
          if(checkifexitasFriend?.length > 0){
            setuserFriendId(checkifexitasFriend[0].userTouserId)  //userTouserObject
          setUserNotificaton(checkifexitasFriend[0].notification[0].notificationId)
          
          }
        

        } catch (error) {
          console.error("error fetching ther user pic", error)
        }
      }


    };


    const fetchUserInfo = async () => {

      try {

        const encodedSearchQuery = encodeURI("http://localhost:3000/api/userTouser")
        // console.log("search:", encodedSearchQuery)
        const requestUserInfo = await queryUser(searchQuery)
        setDisplayUserInfo(requestUserInfo)
      

        if (requestUserInfo?.length > 0) {
          setUserProfilImage(requestUserInfo[0].picture)
          setUserIdData(requestUserInfo[0].userId)

        }



      } catch (error) {
        console.log('Error fetching User input data', error);

      }


    };



    // debounce will execute the api request after a timeslot of 500 ms 
    const debounceFetch = debounce(fetchUserInfo, 500);


    // debounce is based on the input, so every time there is certain pause the funciton will be executed 
    debounceFetch(searchQuery)

   

    // Execute fetchUserPic initially
    fetchUserPic()



    return () => {
      // clearInterval(intervalId);
      debounceFetch.cancel()
    }

  }, [searchQuery, userIdData, refreshComponent, refreshDeleteComponent])


  // const handleSearchQuery = (e) => {
  //   e.prevenDefault(); 
  //   const encodedSearchQuery = encodeURI(searchQuery)
  //   console.log("search:",encodedSearchQuery)
  // }





  return (
    <div>
      {/* <form onSubmit={handleSearchQuery}> */}

      <div className={searchstyle['searchContent']}>
        <input type="text" className={searchstyle['searchInput']}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button className={searchstyle['searchBtn']} >Search</button> */}
      </div>

      {/* </form> */}



      <div className={searchstyle['DisplayUserSection']}>
        {displayUserInfo.map((event, i) => (
        
            <div key={i}>
              <div className={searchstyle['displayUserArea']}>

                {userProfilImage && (
                  <div className={searchstyle['displayUserContent']}>
                    <div className={searchstyle['DisplayImageArea']}>

                      <Image className={searchstyle['DisplayImageContent']} src={`/${userProfilImage.pictureUrl}`} alt="other user profil picture" width={110} height={70}
                        quality={100}
                      />

                      <div className={searchstyle['userOverlay']}>
                        <Image className={searchstyle['userOverBack']} src={Gift}  alt="otheruserOveral" width={800} height={300} />
                        <div className={searchstyle['userOverlayImageContent']}>
                          <Image className={searchstyle['userOverlayImage']} src={`/${userProfilImage.pictureUrl}`} alt='other user Overlay Background Image' width={140} height={140}
                            quality={100}
                          />
                        </div>
                      </div>
                    </div>

                  {/* name section */}
                    <div className={searchstyle['displayUserName']}>
                      {event.userName}

                    
                  

                    </div>
                    <div className={searchstyle['searchFollowOption']}>
                      {userUnFollowArea && (
                         
                        <div className={searchstyle["SearchFollowArea"]}>
                          
                           <button className={searchstyle["SearchFollowBtn"]} onClick={() => UnFollowUserFetch(userFriendsId, userNotification)}>Unfollow</button>
                           
                        </div>
                      )}
                      {userFollowArea && (
                        <div className={searchstyle["SearchFollowArea"]}>
                          <button onClick={() => followUserFetch(userIdData)}>Follow</button>
                         
                        </div>
                      )}

                      {/* <button onClick={ () =>followUserFetch(userIdData)}>follow</button> */}
                    </div>
                  </div>
                )}

              </div>






            </div>
         
        ))}



      </div>



    </div>

  )
}

export default SearchInput
