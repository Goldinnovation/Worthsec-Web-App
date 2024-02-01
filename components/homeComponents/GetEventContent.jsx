'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import addUser from '@assets/add-user.png'
import message from '@assets/conversation.png'
import setting from '@assets/Coversetting.png'
import deleteIcon from '@assets/delete.png'
import Createbtn from '@utils/Createbtn'



export async function getContent(){
    try{

        const res = await fetch('http://localhost:3000/api/events', {
            method: "GET",
            // cache: "no-store",
            next: { revalidate: 50}
           
        })
        
        if(!res.ok){
            throw new Error('res IS NOT OK,ERROR')
        }

        const data = await res.json()
        // console.log(data)
        return data
        

    }

    catch(error){
        console.error('Fetch API ERROR')
    }
}







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









const GetEventContent = () => {
    
    const [allEventContent, setAllEventContent] = useState([])
    // const [eventWindow, setEventWindow] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
  

    
    const handleDelete = async(eventId,eventpath) => {
        try{
            await deleteobj(eventId,eventpath)

            // Look this area up 

            const updatedData = allEventContent.filter((event) => event.id !== eventId)
            setAllEventContent(updatedData)

            if(selectedEvent && selectedEvent.id === eventId){
                setSelectedEvent(null)
            }

           

        }catch(error){
            console.error('function error', error)
        }
    }


    const handlepopuptoggle = (event) => {

        // set the toggle to the event object 
        setSelectedEvent(selectedEvent === event ? null : event)

       

    }

    const handleCloseCLick = () => {

        setSelectedEvent(null)

    }
   

    
    useEffect(() => {
        
        const fetchEventData =  async() => {
            const data = await getContent();

            setAllEventContent(data)
            

        }

        const intervalId = setInterval(fetchEventData, 2000)

        fetchEventData();
       
        return () => clearInterval(intervalId)
    },[])


  return (

    <>
     {/* after entering all necessary information to create an Event, A object will be generated as the event
    when user hovers over the object, the object will show the event options like intiving friend, chatting and setting */}
       <div className='contentCreateSection'>
       <div className='eventContentSection'>
            
            {allEventContent.map((event, i) => (
             <div className='eventContentSectionArea'>
                <div key={i} className='eventContentKey' >
                        <div className='eventContent'>
                            
                            <div className='ImageCoverContent' onClick={() => handlepopuptoggle(event)}>
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
                        {selectedEvent && selectedEvent.id  === event.id && (
                                
                                <div className='eventWindoOverlay' > 
                                  <div className='eventWindowSection'>
                                    <div className='eventWindowContent'>
                                        <div className='eventwindowHeader'>
                                        <div className='eventWindowTitle'>
                                        title
                                        </div>
                                        <div className='eventwindowClose' onClick={handleCloseCLick}>
                                        x
                                        </div>

                                        </div>
                                        
                                        <div className='eventWindowImage'>
                                        <Image src={event.ImageCoverUpload} className='eventWindowImageContent'  
                                        width={300}
                                        height={270}
                                        quality={100}
                                        alt='Cover of Job ad'/>

                                        <div className='eventMetaData'>
                                                <p className='eventHostMetaDataHost'>Host: Emmanuel</p>
                                                <p className='eventHostMetaDataDate'>Date: 23.15.24</p>
                                                <p className='eventHostMetaDataeventType'>Type: Party</p>
                                        </div>
                                        </div>

                                        <div className='eventWindowImageDescriptionArea'>
                                            <input type="text" className="eventWindowImageDescription" />
                                        </div>
                                    </div>


                                    <div className='eventWindowNav'>
                                        <div className='eventWindowNavOptions'>
                                            <div className='eventoptionView'>
                                                <Image src={addUser} width={18} height={18}/>
                                            </div>
                                            <div className='eventoptionMessage'>
                                                <Image src={message} width={18} height={18}/>
                                                </div>
                                            <div className='eventoptionAddUser'>
                                            <Image src={setting} width={18} height={18}/>
                                            </div>
                                            <div className='eventoptionsEdit'>
                                            </div>
                                            <div className='eventoptionsDelete'>
                                            <Image src={deleteIcon}  width={20} height={20} onClick={() => handleDelete(event.id, event.ImageCoverUpload)}/>
                                            </div>
                                        </div>
                                        
                                    </div>
                                  </div>

                                  </div>
                                  

                            )
                            }
                    
                </div>
            
            ))} 
    
        </div>

        <div className='create-addbtn-area'>
            <Createbtn/>
        </div>


       </div>
      
      
    </>
  )
}

export default GetEventContent
