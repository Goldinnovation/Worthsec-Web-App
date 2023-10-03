'use client'
import React from 'react'
import OrangeAddbtn from '@assets/O-add-btn.png'
import Image from 'next/image'
import { useState } from 'react'
import uploadCoverImg from '@assets/UploadCover.png'
import { useRouter } from 'next/navigation'




const Createbtn = () => {
  const [imagePreview, setImagePreview] = useState(null)
   const [model, setModel] = useState(false)
    

   const [eventData, setEventData] = useState({
    eventTitle: "",
    eventType: "", 
    eventDate: "",
    eventDescriptionContent: "",
    eventTime: "",
    ImageCoverUpload: "",

   })


   const togglemodal = () =>{
      setModel(!model)
   }

   const handleInput = (e) => {
    let value = e.target.value; 

    if(e.target.className === 'eventDate' && value){
      value = new Date(value).toISOString()

    }

    if(e.target.className === 'eventType' && value){
      value = parseInt(value)
    }

    setEventData({...eventData, [e.target.className]: value})   

   }

   const handleImageUpload = (e) => {
    
    const file = e.target.files[0]
   

    if(file){
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);

            setEventData(imagePreview =>({...imagePreview, ImageCoverUpload: file

            }))
        }

        if (file && (file.type.match(/image\/jpeg/) || file.type.match(/image\/png/))){
            reader.readAsDataURL(file);
        }


      
    }
   }

  


   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ImageCoverUpload', eventData.ImageCoverUpload)
    formData.append('eventTitle', eventData.eventTitle)
    formData.append('eventDate', eventData.eventDate)
    formData.append('eventDescriptionContent', eventData.eventDescriptionContent)
    formData.append('eventType', eventData.eventType)
    formData.append('eventTime', eventData.eventTime)

    
    
    
    
    try {
      const res = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        body: formData,
      });

  
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
  
      const data = await res.json(); 
      console.log(data);
      setEventData('')
      setImagePreview("")
      
      togglemodal(!model);
      
  
      
    } catch (error) {
      console.error('Fetch error:', error.message);
      
    }

   }



  return (
    <div>
      {model && (
          
          <div className="create-event-area">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='create-event-content'>
                <div className='title-date-content'>
                  <div className='event-title-area'>
                  <input type="text" className="eventTitle" onChange={handleInput} placeholder='Enter your Event Title' required/>
                  </div>

                  <div className='eventtype-date-area'>
                  <select className="eventType" onChange={handleInput} required>
                          <option value=''  className='event-type-content'>Event-type</option>
                          <option value="1">Exhibiton</option>
                          <option value={2}>House party</option>
                          <option value={3}>Club Party</option>
                        
                </select>
                <input type="date" className='eventDate' onChange={handleInput} required/>
                </div>
                  </div>
                
                
                <div className='upload-event-Image'>
                  <div className='Invite-content-area'> 
                <div className='invite-content'  required>
                  <div className='onlyFriends-content'>
                  <label htmlFor="friendsId" className='onlyFriends' style={{color:'#ffffff'}}>Only friends</label>
                  <input 
                  type="checkbox"
                  id="friendsId" 
                  className='friends'
                  
                  />
                  </div>
               
                  
                  <div className='friendsPlus-content'>
                  {/* <style jsx>{`
                               #friendsPlusPlus:checked {
                                      outline: 2px solid #ffffff;  // Set a constant outline when checkbox is checked
                                  }
                              `}</style> */}
                  <label for="friendsPlusPlus" style={{color:'#ffffff'}}>Friends++</label>
                  <input 
                  type="checkbox"
                  id='friendsPlusPlus' 
                  className='friendsPlusPlus'    
                  
                  />

                  </div>
                 
                  <div className='worldWide-content'>
                  {/* <style jsx>{`
                                  #worldwide:checked {
                                      outline: 2px solid #ffffff;  // Set a constant outline when checkbox is checked
                                  }
                                  `}</style> */}
                  <label for="worldwide" style={{color:'#ffffff'}}>WorldWide</label>
                  <input 
                  type="checkbox"
                  id='worldwide' 
                  className='worldwideClass'
                  
                  />
                  </div>
                  



                </div>
                
                </div>  
                </div>


                <div className='event-Description-And-ImageArea'>
                  {/* Image Upload  */}
                <div className='UploadCoverArea'>
           <input type="file" className="ImageCoverUpload"  id="UploadtriggerId"  onChange={handleImageUpload} hidden/>
           {imagePreview ? (
                <Image 
                    src={imagePreview} 
                    alt="Uploaded Preview"
                    width={250} 
                    height={250}
                    className='imagePreview'
                    onClick={() => document.getElementById("UploadtriggerId").click()} 
                    style={{ cursor: 'pointer' }}
                    required
                />
            ) : (
                <Image 
                    src={uploadCoverImg}
                    className='ImageCoverIcon'
                    alt='default Upload ImageIcon' 
                    width={100} 
                    height={100}
                    onClick={() => document.getElementById("UploadtriggerId").click()} 
                    style={{ cursor: 'pointer' }}
                    
                />
            )}
                </div>

      
                  <input type="text" className='eventDescriptionContent' onChange={handleInput} placeholder='Describe your Event'  required/>
                </div>

                <div className='createEventBtnArea'>
                  <div className='btnContentArea'>
                  <input type="time"  className='eventTime' onChange={handleInput}  required/>
                <button className="createEventBtn"  >Submit</button>
                  </div>
                </div>
                 
                  
                
            </div>
            </form> 
          </div>
      )}
        
               <button className='add-event-btn' onClick={togglemodal}><Image src={OrangeAddbtn} alt='imgbtn' height={50} width={50}/></button>
       
           
    </div>
  )
}

export default Createbtn
