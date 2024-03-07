'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import addUser from '@assets/add-user.png'
import message from '@assets/conversation.png'
import setting from '@assets/Coversetting.png'
import deleteIcon from '@assets/delete.png'
import Createbtn from '@utils/Createbtn'
import eyeIcon from '@assets/eye-track.png'
import useSWR, { mutate } from 'swr';
import infoIcon from '@assets/infoIcon.png'




// export async function getContent(){
//     try{

//         const res = await fetch('http://localhost:3000/api/events', {
//             method: "GET",
          
           
//         })
        
//         if(!res.ok){
//             throw new Error('res IS NOT OK,ERROR')
//         }

//         const data = await res.json()
//         // console.log(data)
//         return data
        

//     }

//     catch(error){
//         console.error('Fetch API ERROR')
//     }
// }







export async function deleteobj(eventId,eventpath) {
    try{

        const res = await fetch(`http://localhost:3000/api/events/${eventId}`,{

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({eventpath})
        }); 
        if(!res.ok){
            throw new Error(' Delete req has failed')
        }

    }catch(error){
        console.error('Delete fetch error', error)
    }
}






const fetcher = (url) => fetch(url).then((res) => res.json())


const GetEventContent = () => {
    
    // const [allEventContent, setAllEventContent] = useState([])
    // const [eventWindow, setEventWindow] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventOptions, setEventOptions] = useState(false)
    const [userInviteSection, setUserInviteSection] = useState(false)
    const [eventInfo, setEventInfo] = useState(true)

    const {data: allEventContent, error} = useSWR('http://localhost:3000/api/events', fetcher,{
        refreshInterval: 5000,
        // revalidateOnFocus: false
    })




    const handleEventToggle = () => {
        setEventOptions(!eventOptions)

    }

    const handleUserToggleInvite = () => {
        setUserInviteSection(true)
        setEventInfo(false)
        
    }

    const handleEventInfo = () => {

        setEventInfo(true)
        setUserInviteSection(false)
    }

    const handleEventDelete = () => {
        setEventInfo(false)
    }
   

  

   

  
  

// Deletes the Event Object 
    const handleDelete = async(eventId,eventpath) => {
        try{
            await deleteobj(eventId,eventpath)

            // Look this area up 
           
            const updatedData = allEventContent?.filter((event) => event.id !== eventId)
                allEventContent(updatedData)           

        }catch(error){
            console.error('function error', error)
        }
    }




    const handleEventtoggle = (event) => {

        // set the toggle to the event object 
        setSelectedEvent(selectedEvent === event ? null : event)
        if(selectedEvent === event ? null : event){
            handleEventInfo()
        }

       

    }


    // checks the change of the allEventContent by tracking the length, if the length is higher than zero show the last object 
    // if the length is equal zero, it will show no object 

    useEffect(() => {
        if(allEventContent?.length > 0){
            console.log(allEventContent)
            setSelectedEvent(allEventContent[allEventContent?.length - 1])
        }else {
            setSelectedEvent(false)
        }
    },[allEventContent])

    
    
    // useEffect(() => {
        
    //     const fetchEventData =  async() => {
    //         const data = await getContent();

    //         setAllEventContent(data)
            

    //     }

    //     const intervalId = setInterval(fetchEventData, 2000)

    //     fetchEventData();
       
    //     return () => clearInterval(intervalId)
    // },[])


  return (

    <>
     {/* after entering all necessary information to create an Event, A object will be generated as the event
    when user hovers over the object, the object will show the event options like intiving friend, chatting and setting */}
       <div className='contentCreateSection'>
       <div className='eventContentSection'>
            {allEventContent?.map((event, i) => (
             <div className='eventContentSectionArea'>
                <div key={i} className='eventContentKey' >
                        <div className='eventContent'>
                            
                            <div className='ImageCoverContent' onClick={() => handleEventtoggle(event)}>
                                <Image src={event.ImageCoverUpload} className='img-content-cover'  
                                // fill
                                width={180}
                                height={170}
                                quality={100}
                                alt='Cover of Job ad'/>
                                <div className='ImageEventTitle'>
                                    <h2>{event.eventTitle}</h2>
                                </div>
                            </div>       
                      </div>
                      </div>
                    
                </div>
            
            ))} 
    
        </div>

        <div className='create-addbtn-area'>
            
        
            <Createbtn/>
        
        </div>


       </div>

       <div className='DisplayEventArea'>

        
        
       {selectedEvent && selectedEvent.id && (
                                
                        
                                // <div className='eventWindoOverlay' > 
                                  <div className='eventWindowSection'>

                                    <div className='eventUserInfo'>
                                        <div className='eventwindowHeader'>
                                        <div className='eventWindowTitle'>
                                        {selectedEvent.eventTitle}
                                        </div>
                                        </div>

                                        { eventInfo && (
                                            <div className='eventWindowLayer'>
                                         <div className='eventWindowImage'>
                                        <Image src={selectedEvent.ImageCoverUpload} className='eventWindowImageContent'  
                                        width={400}
                                        height={350}
                                        quality={100}
                                        alt='Cover of Job ad'/>
                                        </div>

                                        </div>
                                        )}
                                  </div>

                                  
                                  {userInviteSection && (
                                                <div className='eventInviteUserSection'>
                                                     ewewe
                                                </div>
                                    )}

                                
                                  <div>
                                    
                                  <div className='eventWindowNav'>
                                      
                                        <div className='eventInviteInputSection'>
                                            <div>
                                                    {userInviteSection && (
                                                        <div  className='userInviteSearch'>
                                                            <input type="text" className="userInviteInput" />
                                                            <div>
                                                                <button className='inviteUserToEventBtn'>Send</button>
                                                            </div>
                                                        </div>
                                                    )}
                                            </div>

                                        </div> 

                                         <div className='eventWindowNavOptions'>
                                            <div className='eventeyeSection' onClick={handleEventToggle}>
                                            <Image  src={eyeIcon} width={18} height={18} />
                                            </div>
                                          
                                                {eventOptions && (
                                                    
                                                    
                                                    <div className='eventOptionContentArea'>
                                                           

                                                            
                                                            <div className='eventoptionsDelete'>
                                                                 <Image src={setting}  width={18} height={18} onClick={() => handleDelete(selectedEvent.id, selectedEvent.ImageCoverUpload)}/>
                                                            </div>
                                                            <div className='eventoptionMessage'>
                                                                <Image src={message} width={18} height={18}/>
                                                            </div>
                                                            <div className='eventoptionAddOtherUser'>
                                                               <Image src={addUser} width={18} height={18} onClick={handleUserToggleInvite}/>
                                                            </div>
                                                            <div>
                                                            <Image src={infoIcon} width={18} height={18} onClick={handleEventInfo}/>
                                                            </div>
                                                    </div>
                                                )}
                                           
                                            
                                            
                                            {/* <div className='eventoptionsDelete'>
                                            <Image src={deleteIcon}  width={20} height={20} onClick={() => handleDelete(selectedEvent.id, selectedEvent.ImageCoverUpload)}/>
                                            </div> */}
                                        </div>
                                        
                                    </div> 
                                  
                                    
                                  </div>

                                 </div>
                                  

                            )
                            }
        </div>
      
      
    </>
  )
}

export default GetEventContent
