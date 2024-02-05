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


const DisplayJoinEvent = ({}) => {
    const [eventidData, setEventIdData] = useState([])
    const [displayEvent, setDisplayEvent] = useState([])
    const [optiontypeToggle, setoptiontypeToggle] = useState(false)
    const {data: allJointEventsbyUser, error} = useSWR('http://localhost:3000/api/DisplayJoinedEvent', fetcher,{})
    const [eventObj, setEventObj] = useState(null)



    

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


    useEffect(() => {
       
        setEventObj(displayEvent[displayEvent.length - 1])
      }, [displayEvent]);


    const handleEventObj = (event) => {
        setEventObj((prevEventObj) => (prevEventObj === event ? null : event));
    
      };


    const toggleoptionbar = () => {
        setoptiontypeToggle(!optiontypeToggle)
    }


    

  
    
    

  return (
    <>
        <div className={styles['displayuserJoinedEvent']}>

            <div className={styles["typebaroption_display_join_leftSection"]}>
            <div className={styles["typebaroption_display_join_opt"]}>
            
            {optiontypeToggle && (
                <div>   
                      <div className={styles["typebaroption_display_HoverSection"]}></div>

                </div>
            )}
        
            <div className={styles["typebaroption_display_Section"]} onClick={toggleoptionbar}></div>
          
            </div>
          

          <div className={styles["typebaroption_display_join_event"]}>
                    <div className={styles["join_event_title_section"]}>
                    <div  className={styles["join_event_title_content"]}>
                        <p className={styles["join_event_title"]}>This Week</p>
                    </div>
                    
                    </div>
                    <div className={styles["typebaroption_display_join_event_Content"]}>
                    {displayEvent.map((event, i) => (
                        <div key={i}>
                            <div className={styles["imageContainer"]} onClick={() => handleEventObj(event)}>
                            <Image src={event.ImageCoverUpload} className={styles['JoinedEventImgObj']}  width={100} height={100}/>           
                            </div>
                        
                            </div>
                    ))}

                    </div>

               

          </div>
            


            </div>
          
          <div className={styles["typebaroption_display_join_middleSection"]}>
            {eventObj && (
                    <div className={styles["typebaroption_display_join_overlay"]}>
                        <div className={styles["typebaroption_display_join_window"]}></div>
                        
                        <div className={styles["typebaroption_display_join_layerbar"]}>
                            <div className={styles["typebaroption_display_join_leftbar"]}>
                                    ss
                            </div>
                            <div className={styles["typebaroption_display_join_middleImage"]}>
                              <Image src={eventObj.ImageCoverUpload} width={50} height={50} className={styles["typebaroption_display_join_middleImage"]}/>
                            </div>
                            <div className={styles["typebaroption_display_join_rightbar"]}>
                                        dd
                            </div>

                        </div>
                    </div>
            )}
        </div>

            
        </div>

       
    </>
  )
}



export default DisplayJoinEvent
