import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';
import Image from 'next/image';
import style from '@styles/notification.module.css'





const fetcher = (url) => fetch(url).then((res) => res.json())


const DisplayNotifications = () => {
// const [userNotification, setUserNotification] = useState(null)
const {data: displayNotification, error} = useSWR('http://localhost:3000/api/notifications', fetcher,{
   refreshInterval: 5000
})


// useEffect(() => {
//     if(displayNotification){
//         setUserNotification(displayNotification)
//        console.log('hallo');
//     }

// }, [])


// console.log(displayNotification)
  return (
    <div>

      {
        displayNotification  && displayNotification.map ? (
          displayNotification.map((event, i) => (
            <div key={i}>


                <div className={style['notificationSection']}>
                <div>
                  {displayNotification.userName}
                    <Image src={`/${event.picture.pictureUrl}`}
                    width={60}
                    height={60}
                    className={style["otherUserImg"]}
                    />
                </div>
                <div  className={style['requestedText_Content']}>
                <p className={style['requestedText_Title']}>{event.userName}</p> 
                <p className={style['requestedText_restText']}> followes you now </p>

                </div>
                 
                </div>
                
            </div>
        ))
        ) : (
          <p>Loading...</p>
        )
      }
       
       
    </div>
  )
}

export default DisplayNotifications
