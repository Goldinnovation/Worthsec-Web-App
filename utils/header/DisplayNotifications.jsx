import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr';







const fetcher = (url) => fetch(url).then((res) => res.json())


const DisplayNotifications = () => {
const [userNotification, setUserNotification] = useState(null)
const {data: displayNotification, error} = useSWR('http://localhost:3000/api/notifications', fetcher,{
   refreshInterval: 5000
})


useEffect(() => {
    if(displayNotification){
        setUserNotification(displayNotification)
    }

}, [])


console.log(displayNotification)
  return (
    <div>
        {userNotification && (
            <p>{userNotification.message}</p>
        )}
        {/* {userNotification?.map((event, i) => (
            <div key={i}>

            </div>
        ))} */}
    </div>
  )
}

export default DisplayNotifications
