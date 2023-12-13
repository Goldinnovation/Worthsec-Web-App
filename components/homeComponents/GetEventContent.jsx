'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import addUser from '@assets/add-user.png'
import message from '@assets/conversation.png'
import setting from '@assets/Coversetting.png'
import deleteIcon from '@assets/delete.png'



export async function getContent(){
    try{

        const res = await fetch('http://localhost:3000/api/events', {
            method: "GET",
            cache: "no-store"
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
  

    
    const handleDelete = async(eventId,eventpath) => {
        try{
            await deleteobj(eventId,eventpath)

            // Look this area up 

            const updatedData = allEventContent.filter((event) => event.id !== eventId)
            setAllEventContent(updatedData)

           

        }catch(error){
            console.error('function error', error)
        }
    }
   

    
    useEffect(() => {
        
        const fetchEventData =  async() => {
            const data = await getContent();

            setAllEventContent(data)
            

        }

        const intervalId = setInterval(fetchEventData, 5000)

        fetchEventData();
       
        return () => clearInterval(intervalId)
    },[])


  return (

    <>
     {/* after entering all necessary information to create an Event, A object will be generated as the event
    when user hovers over the object, the object will show the event options like intiving friend, chatting and setting */}
        <div className='eventContentSection'>
            
            {allEventContent.map((event, i) => (
             <div>
                <div key={i} >
                        <div className='eventContent'>
                            
                            <div className='ImageCoverContent'>
                                <Image src={event.ImageCoverUpload} className='img-content-cover'  
                                fill 
                                quality={100}
                                alt='Cover of Job ad'/>
                                <div className='ImageEventTitle'>
                                    <h2>{event.eventTitle}</h2>
                                </div>
                            </div>
                            
                          
                            <div className='CoverContentBar'>
    
                                <div className='ImgCoverContent-add-user'>
                                    <Image src={addUser} width={18} height={18}/>
                                </div>
                                <div className='ImgCoverContent-message'>
                                    <Image src={message} width={18} height={18}/>
                                </div>
                                <div className='ImgCoverContent-setting'>
                                    <Image src={setting} width={18} height={18}/>
                                    
                                </div>
                                <div className='ImgCoverContent-delete'>
                                    <Image src={deleteIcon}  width={22} height={22} onClick={() => handleDelete(event.id, event.ImageCoverUpload)}/>
                                </div>
                            </div>
    
                            
                      </div>
                            
                        </div>
                    
                </div>
            
            ))}
    
        </div>
      
    </>
  )
}

export default GetEventContent
