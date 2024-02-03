import React, { useEffect, useState } from 'react'
import styles from '@styles/joinandfavorstyle.module.css'
import useSWR, { mutate } from 'swr';
import { headers } from '@next.config';
import Image from 'next/image';





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
            return data
            

        }catch(error){
            console.log("Request Error on handleeventRequest:", error)
        }
}



const fetcher = (url) => fetch(url).then((res) => res.json())


const DisplayJoinEvent = () => {
    const [eventidData, setEventIdData] = useState([])
    const [displayEvent, setDisplayEvent] = useState([])

    const {data: allJointEventsbyUser, error} = useSWR('http://localhost:3000/api/DisplayJoinedEvent', fetcher,{})

    
    useEffect(() => {
    
             if(allJointEventsbyUser?.length > 0 ){

               
                
                 const eventId = allJointEventsbyUser.map(event => event.event_id)
                 setEventIdData(eventId);


                 const fetcheventIdData = async() => {
                        const data = await handleeventRequest(eventId);
                        setDisplayEvent(data)

                 }

                 fetcheventIdData()
             
        }

    

    }, [allJointEventsbyUser]);

    

    
    

  return (
    <>
        <div className={styles['displayuserJoinedEvent']}>
            sdds
            {displayEvent.map((event, i) => (
                <div key={i}>
                    <div className={styles["joinEventContentSection"]}>
                    <Image src={event.ImageCoverUpload} className={styles['JoinedEventImgObj']}  width={100} height={100}/>

                        
                    </div>
                  
                    </div>
            ))}
             
        </div>
    </>
  )
}

export default DisplayJoinEvent
