'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import addUser from '@assets/add-user.png'
import message from '@assets/conversation.png'
import setting from '@assets/Coversetting.png'
import { useRouter } from 'next/navigation'



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
        console.log(data)
        return data
        

    }

    catch(error){
        console.error('Fetch API ERROR')
    }
}


const GetEventContent = () => {

    const [allEventContent, setAllEventContent] = useState([])
    
    

    useEffect(() => {
        
        const fetchEventData =  async() => {
            const data = await getContent();
            
            
            setAllEventContent(data)
        }

       
        fetchEventData();
        const intervalId = setInterval(fetchEventData, 2000)
        return () => clearInterval(intervalId)
    },[])

   

   

  return (
    <>
        <div className='eventContentSection'>
        {allEventContent.map((event, i) => (
         <div>
            <div key={i} >
                    <div className='eventContent'>
                        <div className='ImageCoverContent'>
                            <Image src={`/${event.ImageCoverUpload}`} className='img-content-cover'  
                            width={230} height={235} alt='Cover of Job ad'/>
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
