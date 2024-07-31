'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import addUser from '@assets/add-user.png'
import message from '@assets/conversation.png'
import setting from '@assets/Coversetting.png'
import deleteIcon from '@assets/delete.png'
import Createbtn from '@/utils/Createbtn'
import eyeIcon from '@assets/eye-track.png'
import useSWR, { mutate } from 'swr';
import infoIcon from '@assets/infoIcon.png'
import InviteUsertoEvent from '@/utils/userFeed/InviteUsertoEvent'
import searchIcon from '@assets/search.png'




interface Eventprops{
    ImageCoverUpload: string;
    eventDate: string;
    eventDescriptionContent: string;
    eventHost: string;
    eventId: string;
    eventInviteType: number;
    eventTime: string;
    eventTitle: string;
    eventType: number;
}






export async function deleteobj(eventId: string,eventpath: string) {
    try{
        console.log(eventId);
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






const fetcher = (url: string) => fetch(url).then((res) => res.json())


const GetEventContent = () => {
    
    // const [allEventContent, setAllEventContent] = useState([])
    // const [eventWindow, setEventWindow] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<Eventprops | null>(null);
    const [eventOptions, setEventOptions] = useState(false)
    const [userInviteSection, setUserInviteSection] = useState(false)
    const [eventInfo, setEventInfo] = useState(true)
    // const [rerender, setRerender] = useState(false)

    const {data: allEventContent, error,} = useSWR('http://localhost:3000/api/events', fetcher,{
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
    const handleDelete = async(eventId: string,eventpath: string, event: Eventprops) => {
        try{

            const userDeletsEvent = await deleteobj(eventId,eventpath)
            
            if(eventId && eventpath){
            
                const updatedEventContent = allEventContent?.filter((event: Eventprops) =>  event.eventId !== eventId)
                 mutate('http://localhost:3000/api/events', updatedEventContent, false); 
                console.log(updatedEventContent);
            }
              

        }catch(error){
            console.error('function error', error)
        }
    }

    console.log(allEventContent);




    const handleEventtoggle = (event: Eventprops) => {

        // set the toggle to the event object 
        setSelectedEvent(selectedEvent === event ? event : event)
        if(selectedEvent === event ? null : event){
            handleEventInfo()
        }

       

    }


    // checks the change of the allEventContent by tracking the length, if the length is higher than zero show the last object 
    // if the length is equal zero, it will show no object 

    useEffect(() => {
        if(allEventContent?.length > 0){
            setSelectedEvent(allEventContent[allEventContent?.length - 1])
        }else {
            setSelectedEvent(null)
        }
        
    },[allEventContent])
    useEffect(() => {
        return () => {
          // Clear cache on component unmount
          mutate('http://localhost:3000/api/events', undefined, false);
        };
      }, ['http://localhost:3000/api/events'])

    
    
  return (

    <>
     {/* after entering all necessary information to create an Event, A object will be generated as the event
    when user hovers over the object, the object will show the event options like intiving friend, chatting and setting */}
       <div className='contentCreateSection'>
            <div className='eventContentSection'>
                    {allEventContent?.map((event: Eventprops, i: number) => (
                    <div key={i} className='eventContentSectionArea'>
                        <div className='eventContentKey' >
                                <div className='eventContent'>
                                    
                                    <div className='ImageCoverContent' onClick={() => handleEventtoggle(event)}>
                                        <Image src={event.ImageCoverUpload} className='img-content-cover'  
                                        // fill
                                        width={180}
                                        height={170}
                                        quality={100}
                                        priority = {true}
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

        
        
       {selectedEvent && selectedEvent.eventId && (
                                
                        
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
                                        width={440}
                                        height={400}
                                        quality={100}
                                        alt='Cover of Job ad'/>
                                        </div>

                                        </div>
                                        )}
                                  </div>

                                  
                                  {userInviteSection && (
                                                <div className='eventInviteUserSection'>
                                                    <div className='eventInvitationLayer'>
                                                            <InviteUsertoEvent 
                                                            eventIdData={selectedEvent.eventId}
                                                            />
                                                    </div>
                                                   
                                                </div>
                                    )}

                                
                                  <div>
                                {/* the invite friends search option   */}
                                  <div className='eventWindowNav'>

                                         <div className='eventWindowNavOptions'>
                                            <div className='eventeyeSection' onClick={handleEventToggle}>
                                            <Image  src={eyeIcon} width={18} height={18} alt='Eye Icon' />
                                            </div>
                                          
                                                {eventOptions && (
                                                    
                                                    
                                                    <div className='eventOptionContentArea'>
                                                           

                                                            
                                                            <div className='eventoptionsDelete'>
                                                                 <Image src={setting} alt='current user event delete Icon'  width={18} height={18} onClick={() => handleDelete(selectedEvent.eventId, selectedEvent.ImageCoverUpload, selectedEvent)}/>
                                                            </div>
                                                            <div className='eventoptionMessage'>
                                                                <Image src={message} alt='current user event message Icon' width={18} height={18}/>
                                                            </div>
                                                            <div className='eventoptionAddOtherUser'>
                                                               <Image src={addUser}alt='current user add Icon' width={18} height={18} onClick={handleUserToggleInvite}/>
                                                            </div>
                                                            <div>
                                                            <Image src={infoIcon} width={18} height={18} alt='current user info icon' onClick={handleEventInfo}/>
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
