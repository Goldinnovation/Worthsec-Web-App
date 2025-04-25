'use client'
import React  from 'react'
import OrangeAddbtn from '@assets/O-add-btn.png'
import Image from 'next/image'
import { useState } from 'react'
import uploadCoverImg from '@assets/UploadCover.png'
import { useRouter } from 'next/navigation'
import e from 'cors'




const Createbtn = () => {
   const [imagePreview, setImagePreview] = useState(null)
   const [model, setModel] = useState(false)
   const router = useRouter();
  const [rangeValue, setRangeValue] = useState(0)




  const handleRangeInput = (e) => {
    const range = e.target.value
    console.log(range);
   
    setRangeValue(range)
  
  }
  console.log(rangeValue);

   const [eventData, setEventData] = useState({
    eventTitle: "",
    eventType: "", 
    eventDate: "",
    eventDescriptionContent: "",
    eventTime: "",
    ImageCoverUpload: "",
    Only_friends:"",
    friends_Plus_Plus:"",
    worldwideClass: "",
    eventAddress: "",
    eventZipcode: 0,
    cityType: "",
    selectedRangeofEvents:""
    


   })


   const togglemodal = () =>{
      setModel(!model)
   }

   const handleInput = (e) => {
   
    let value = e.target.value; 
   

    if(e.target.className === 'eventDate' && value){
      value = new Date(value).toISOString()

    }

    // if(e.target.className === 'eventType' && value){
    //   value = parseInt(value)
    // }

    if(e.target.className === "Only_friends" && value){
      value  = 1

    }else if (e.target.className === "friends_Plus_Plus" && value){
      value =2
    }else if(e.target.className === "worldwideClass" && value){
      value = 3 
      console.log(value)
      
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


   const handleClose = () => {
    
    setRangeValue(0)
    togglemodal(!model);
    setEventData('')
    setImagePreview("")
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
    formData.append('Only_friends', eventData.Only_friends)
    formData.append('friends_Plus_Plus', eventData.friends_Plus_Plus)
    formData.append('worldwideClass', eventData.worldwideClass)
    formData.append('eventAddress', eventData.eventAddress)
    formData.append('eventZipcode', eventData.eventZipcode)
    formData.append('cityType', eventData.cityType)
    formData.append('selectedRangeofEvents', rangeValue)










    
    
    
    
    try {
     
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
        method: 'POST',
        body: formData,
      });



      

  
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
  
      const data = await res.json(); 
      togglemodal(!model);
      setEventData('')
      setRangeValue(0)
      setImagePreview("")
      
      
      
  
      
    } catch (error) {
      console.error('Fetch error:', error.message);
      
    }

   }




  return (
    <div>
      {model && (
          
          <div className='create_event_overlay'>
            
          <div className="create-event-area">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='create-event-header'>
              <div className='create-event-header-title'>
              <h1>Create your Event</h1>
              </div>
              <div className='clostebtn-createEvent' onClick={handleClose}>
                close
              </div>
            </div>
            <div className='create-event-content'>
                <div className='title-date-content'>
                  {/* title area */}
                  <div className='event-title-area'>
                  <input type="text" className="eventTitle" onChange={handleInput} placeholder='Enter your Event Title' required/>


                  <div className='time_and_Date_area'>
                 

                  <input type="time"  className='eventTime' onChange={handleInput}  required/>
                  <input type="date" className='eventDate' onChange={handleInput} required/>

                </div>
                  </div>

                  <div className='eventtype-date-area'>
                <div className='eventtype_area'>
                  
                    <select className="eventType" onChange={handleInput} required>
                          <option value=''  className='event-type-content'>Event-type</option>
                          <option value="Movie">Movie</option>
                          <option value="Techno">Techno</option>
                          <option value="Hip-Hop">Hip-Hop</option>
                          <option value="Art">Art</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Festivals">Festivals</option>
                          <option value="Bookclubs">Bookclubs</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Flea Market">Flea Market</option>
                          <option value="Exhibition">Exhibition</option>
                          <option value="Pop-Ups">Pop-Ups</option>

                        
                </select>
                </div>
                
                <div className='rangeArea'>
              <input
                type="range"
                id="rangeInput"
                className="selectedRangeofEvents"
                onChange={handleRangeInput}
                min="9"
                max="1000"
                value={rangeValue}
                
              />
              <output htmlFor="rangeInput" id="outputValue">
                {rangeValue}
              </output>
                </div>
                

                
            

                </div>
                  </div>
                
                
                {/* <div className='upload-event-Image'> */}
                <div className='address-zipcode-country-area'>
                  <div className='address-zipcode-area'>
                     <div className='address-section'>
                     <input type="text" className="eventAddress" onChange={handleInput} placeholder='Enter your Event Address' required/>
                     </div>

                     <div className='zipcode-section'>
                     <input type="text" className="eventZipcode" onChange={handleInput} placeholder='Zipcode' required/>
                     </div>
                  </div>
                  <div className='country-area'>
                  <select className="cityType" onChange={handleInput} required>
                          <option value=''  className='country-type-content'>City</option>
                          <option value="Berlin">Berlin</option>
                          <option value="New York">New York</option>
                          <option value="Cologne">Cologne</option>
                          <option value="Barcelona">Barcelona</option>
                          <option value="Paris">Paris</option>
                          <option value="Paris">Tokyo</option>
                          <option value="Paris">Oslo</option>

                        
                  </select>
                  </div>
                 
                </div>
                  <div className='Invite-content-area'> 
                <div className='invite-content'  required>
                  <div className='onlyFriends-content'>
                  <label htmlFor="friendsId" className='onlyFriends' style={{color:'#ffffff'}}>Only friends</label>
                  <input 
                  type="checkbox"
                  id="friendsId" 
                  className='Only_friends'
                  onChange={handleInput}
                  
                  />
                  </div>
               
                  
                  <div className='friendsPlus-content'>
                  <label for="friendsPlusPlus"  style={{color:'#ffffff'}}>Friends++</label>
                  <input 
                  type="checkbox"
                  id='friendsPlusPlus' 
                  className='friends_Plus_Plus' 
                  onChange={handleInput}   
                  
                  />

                  </div>
                 
                  <div className='worldWide-content'>
                  <label for="worldwide"  onChange={handleInput} style={{color:'#ffffff'}}>WorldWide</label>
                  <input 
                  type="checkbox"
                  id='worldwide' 
                  className='worldwideClass'
                  onChange={handleInput}
                  
                  />
                  </div>
                  



                </div>
                
                  </div>  
                {/* </div> */}


                <div className='event-Description-And-ImageArea'>
                  {/* Image Upload  */}
                <div className='UploadCoverArea'>
           <input type="file" className="ImageCoverUpload" alt="Input file on create button"  id="UploadtriggerId"  onChange={handleImageUpload} required hidden/>
        

          
           {imagePreview ? (
            <div className='imageCoverLayer'>
                <Image 
                    src={imagePreview} 
                    alt="Uploaded Preview"
                    width={260} 
                    height={250}
                    className='imagePreview'
                    onClick={() => document.getElementById("UploadtriggerId").click()} 
                    style={{ cursor: 'pointer' }}
                    required
                />
                </div>
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

      
                  <textarea type="text" className='eventDescriptionContent' onChange={handleInput} placeholder='Describe your Event'  required/>
                </div>

                <div className='createEventBtnArea'>
                  <div className='btnContentArea'>
                  {/* <input type="time"  className='eventTime' onChange={handleInput}  required/> */}
                <button className="createEventBtn"  >Submit</button>
                  </div>
                </div>
                 
                  
                
            </div>
            </form> 
          </div>
          </div>
      )}
        
               <button className='add-event-btn' onClick={togglemodal}><Image src={OrangeAddbtn} alt='imgbtn' height={50} width={50}/></button>
       
           
    </div>
  )
}

export default Createbtn
