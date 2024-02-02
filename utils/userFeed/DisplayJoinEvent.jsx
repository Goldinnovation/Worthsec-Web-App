import React, { useEffect, useState } from 'react'
import styles from '@styles/joinandfavorstyle.module.css'
import useSWR, { mutate } from 'swr';
import { headers } from '@next.config';





const handleeventRequest = async(eventid) => {
  
        try{
            const res = await fetch(`http://localhost:3000/api/DisplayJoinedEvent`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({eventid})
                
            })

            if(!res.ok){
                throw new Error('Response Error on handleeventRequest')
                
            }
            const data = await res.json()
            

        }catch(error){
            console.log("Request Error on handleeventRequest:", error)
        }
}



const fetcher = (url) => fetch(url).then((res) => res.json())


const DisplayJoinEvent = () => {
    const [eventidData, setEventIdData] = useState([])
    const [displayEvent, setDisplayEvent] = useState([])

    const {data: allJointEventsbyUser, error} = useSWR('http://localhost:3000/api/DisplayJoinedEvent', fetcher, {
      


    })


    useEffect(() => {
        if (allJointEventsbyUser?.length > 0  ) {
                console.log(allJointEventsbyUser);
                 const eventId = allJointEventsbyUser.map(event => event.event_id)
                setEventIdData(eventId);
                handleeventRequest(eventId);
                
        }

      

    }, [allJointEventsbyUser]);

    

    
    

  return (
    <>
        <div className={styles['displayuserJoinedEvent']}>
            
            {eventidData.map((event, i) => (
                <div key={i}>{event}</div>
            ))}
             
        </div>
    </>
  )
}

export default DisplayJoinEvent
