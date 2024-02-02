import React, { useEffect, useState } from 'react'
import styles from '@styles/joinandfavorstyle.module.css'




export const allJointEventsbyUser = async() => {
    try{
        const res = await fetch('http://localhost:3000/api/DisplayJoinedEvent', {
            method: "GET", 
           
        })
        if(!res.ok){
            console.log('Unexpected Response Error');
        }
        const data = await res.json()
        // console.log(data);
        return data

    }catch(error){
        console.log('request from allJointEventsbyUser failed - Fetch Error:', error)
    }
}


const userJoinEvent = async(eventidData) => {

    try{

        const res = await fetch(`http://localhost:3000/api/DisplayJoinedEvent`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify({eventidData})
    
        })

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        const data = await res.json()
        console.log(data)

    }catch(error){
        console.log('Request Error on userJoinEvent', error);

    }
   


}





const DisplayJoinEvent = () => {
    const [joineduserId, setJoinedUserId] = useState("")
    const [eventidData, setEventIdData] = useState([])
    const [displayEvent, setDisplayEvent] = useState()

useEffect(() => {

        const fetchUserjoinedEventId = async() => {

            try{
                if(eventidData != ""){
                    const eventId = await userJoinEvent(eventidData)
                    setDisplayEvent(eventId)
                   

                }

            }catch(error){
                console.log("Error on Fetch: fetchUserjoinedEventId request ")
            }
        }
       

    
        const fetchUserId = async() => {
            const data = await allJointEventsbyUser();
            setJoinedUserId(data)
            console.log(joineduserId.length)

            if(joineduserId.length > 0){
                setEventIdData(joineduserId[0].event_id)
                console.log(eventidData);
            }
            

        }

        const intervalId = setInterval(fetchUserId, 5000)
        fetchUserId(); 
        fetchUserjoinedEventId();

        return () => clearInterval(intervalId)
}, [eventidData])


  return (
    <>
        <div className={styles['displayuserJoinedEvent']}>
            sdasdas
{/* 
                 {displayEvent.map((event, i) => {
                    <div key={i}> {event.event_id}</div>
                 })} */}
        </div>
    </>
  )
}

export default DisplayJoinEvent
