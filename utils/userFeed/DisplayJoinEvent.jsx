import React, { useEffect, useState } from 'react'
import styles from '@styles/joinandfavorstyle.module.css'




export const allJointEventsbyUser = async() => {
    try{
        const res = await fetch('http://localhost:3000/api/DisplayJoinedEvent', {
            method: "GET", 
            cache: "force-cache"
        })
        if(!res.ok){
            console.log('Unexpected Response Error');
        }
        const data = await res.json()
        console.log(data);
        return data

    }catch(error){
        console.log('request from allJointEventsbyUser failed - Fetch Error:', error)
    }
}





const DisplayJoinEvent = () => {
    const [joineduserId, setJoinedUserId] = useState(null)

useEffect(() => {
        const fetchUserId = async() => {
            const data = await allJointEventsbyUser();
            setJoinedUserId(data)

        }

        const intervalId = setInterval(fetchUserId, 5000)
        fetchUserId(); 

        return () => clearInterval(intervalId)
}, [])



  return (
    <>
        <div className={styles['displayuserJoinedEvent']}>
            sdasdas

        </div>
    </>
  )
}

export default DisplayJoinEvent
