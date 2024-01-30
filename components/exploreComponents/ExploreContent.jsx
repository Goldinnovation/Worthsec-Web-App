import React, { useEffect, useState } from 'react'
import styles from '@styles/exploreStyle/explore.module.css'
import GlobalHeader from '@utils/globalheader/GlobalHeader'
import Image from 'next/image'




export const getallEventsWorldwide =  async(selectedValues) => {

  try{
    const res =  await fetch(`http://localhost:3000/api/selctedEvents`, {

     method: "POST",
     headers: {
      'Content-Type': 'application/json',
      },
     body: JSON.stringify(selectedValues)

  })
  if(!res.ok){
    Console.log('Error on response: GetallEventsWorldWide')
  }
  const data = await res.json()
  console.log(data)
  return data


  }catch(error){
    console.log('GetallEventsWorldWide:', error)
    // throw Error('Request Error on Fetch: GetallEventsWorldWide')
  }

}

//  User can favor event
const userFavorEvent = async(favoreventId) => {

  try{
    const res = await fetch(`http://localhost:3000/api/favorEvent`, {
    method: "POST", 
    headers:{
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({favoreventId})
    

  })
  if(!res.ok){
    console.log('response Error on userFavorEvent')
  }

  const data =  await res.json()


  }catch(error){
    console.log('userFavorEvent request failed, fetch Error:',error)

  }
  
}


// user can join event#

const userJoinEvent = async(joinEventId) => {
  try{

    const res = await fetch(`http://localhost:3000/api/JoinEvent`,{
      method: "POST", 
      headers:{
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({joinEventId})
      
    })
    if(!res.ok){
      console.log('Response Error: UserJoinEvent fetch')
    }
    const data = await res.json()


  }catch(error){
    console.log('Request Error: userJoinEvent Fetch, unexpected Error:', error)

  }
}



const ExploreContent = () => {

  
  const [rangeValue, setrangeValue] = useState(9)
  const [userexploreData, setuserExploreData] = useState([])
  const [popupSelectedItem, setpopupSelectedItem] = useState(null)
  // const [favoreventId, setFavoreventId] = useState(null)
  const [selectedValues, setSelectedValues] = useState({
    explore_selectTypeofEvent__bmewZ:"3",
    selectedRangeofEvents:"",
    explore_selectTypeofEventCategory__KzDeU:"3"
    



  })






  const handleInput = (e) => {

    if(e.target.className === "selectedRangeofEvents" && e.target.value){

      setrangeValue(e.target.value)
    }
    


    setSelectedValues({...selectedValues, [e.target.className]: e.target.value})

  }

  const handleToggleitem = (event) => {
    setpopupSelectedItem(popupSelectedItem === event ? null : event)
    
  }
  



  useEffect(() => {
    const fetchexploreData = async() => {

      try{
        const exploreData = await getallEventsWorldwide(selectedValues)
        setuserExploreData(exploreData)

      }catch(error){
        console.log('Error fetching explore data:', error)

      }
    };

    // Sets up the interval for the period of the fetch 
    const invervalId = setInterval(fetchexploreData, 52000)

    fetchexploreData()
  
    return () => clearInterval(invervalId)

    // Renders the page from everytime the selectedValue is enterd 
  },[selectedValues])

 






  return (
    <div>
      
       <section className={styles['middleSection']}>
            <div className={styles['middleContentarea']}>
              
                <div className={styles['middleContentbar_left']}>

                </div>
                <div className={styles['middleContentbar']}>
                  <div className={styles['selectContentTypeofEventbar']}>
                  <select className={styles['selectTypeofEvent']}  onChange={handleInput} required>
                          <option value=''  className={styles['event-type-content']} >Event-type</option>
                          <option value="1">Exhibiton</option>
                          <option value={2}>House party</option>
                          <option value={3}>Club Party</option>         
                </select>
                  </div>
                  <div>
                  <input type="range" id="rangeInput"  className='selectedRangeofEvents'  onChange={handleInput} min="9" max="20" value={rangeValue} />
                  <output htmlFor="rangeInput" id="outputValue">{rangeValue}</output>

                  </div>
                  <div className={styles['selectContentCategorybar']}>
                  <select className={styles['selectTypeofEventCategory']}  onChange={handleInput} required>
                          <option value=''  className={styles['event-Category-content']} >Event Category</option>
                          <option value="1">only friends</option>
                          <option value={2}>friends++</option>
                          <option value={3}>WorldWide</option>         
                </select>

                  </div>
                  {/* <div>
                    <button className="startselectSearch" onClick={() => getallEventsWorldwide(selectedValues)}>Start</button>
                  </div> */}
                </div>
                <div className={styles['middleContentbar_right']}>

</div>
                
            </div>
            <div className={styles['middleContentFeed']}>
            <div className={styles['explorefeedContent']}>
              {userexploreData.map((event, i) => (
                <div key={i} className={styles['exploreContentSection']}>
                  <div className={styles['exploreContent']} onClick={() => handleToggleitem(event)}>
                  <Image src={event.ImageCoverUpload} width={200} height={200} quality={100}/>           
                  </div>

                  <div className={styles['exploreContentPopupSection']}>
                    {popupSelectedItem && popupSelectedItem.id === event.id && (

                      <div className={styles['exploreContentPopupOverlay']} >
                        <div className={styles['exploreContentPopupArea']}>
                        <div className={styles['explorePopUpselectedTitleSection']}>
                          <h1  className={styles['explorePopUpselectedTitle']}>
                          {event.eventTitle}
                          </h1 >
                          <div className={styles['explorePopUpselectedClose']} onClick={() =>handleToggleitem(null)}>
                              
                          </div>
                     
                        </div>
                        <div className={styles['explorePopUpselectedContentSection']}>

                          <div className={styles['explorePopUpselectedContent']}>
                          <div className={styles['explorePopUpselectedCover']}>
                          <Image src={event.ImageCoverUpload}  className={styles['explorePopUpCoverItem']} width={400} height={400} quality={100} />  


                          </div>
                          <div className={styles['explorePopUpselectedDescript']}>
                           {event.id}
                          </div>
                          </div>
                          <div className={styles['explorePopUpselectedbar']}>
                              dsndjn
                          </div>
                       
                          

                        </div>
                        <div  className={styles['explorePopUpselectedOptions']}>
                         
                          <button className={styles['explorePopUpselectedOptionbtn1']} onClick={() => userJoinEvent(event.id)}>Join</button>
                        
                         
                          <button className={styles['explorePopUpselectedOptionbtn2']} onClick={() => userFavorEvent(event.id)} >Favor</button>

                         
                         
                          {/* <button className={styles['explorePopUpselectedOptionbtn3']}>Share</button> */}

                          
                        </div>

                     
                        

                      </div>

                    
                        
                      <div className={styles['explorePopUppreview']}>
                      <div className={styles['explorePopUpmovebar']}>
                      {/* <div className={styles['explorePopUpmoveobarleft']} >
                           
                      </div>
                      <div className={styles['explorePopUpmoveobarright']} >
                           
                      </div> */}
                      </div>

                      <div  className={styles['explorePopUpOption']}>
                      {userexploreData.map((event,i) => (
                           <div key={i}  className={styles['explorePopuppreviewSection']}>
                            <div className={styles['explorepreviewContent']} onClick={() => handleToggleitem(event)}>
                            <Image src={event.ImageCoverUpload} width={90} height={90} quality={100}/>           
                            </div>
                           </div>
                           ))}

                      </div>
                           
                      </div>
                      </div>
                      
                    )}

                  </div>
                </div>

              
              ))}      
            </div>

            <div className={styles['feedbarSection']}>

                 {/* <div  className={styles['feetbarContent_circle_left']}> 
                     
                  </div> */}
                  {/* <div   className={styles['feetbarContent_middle']}> 
                 
                   
                  </div>
                  <div   className={styles['feetbarContent_middle2']}> 
                 
                   
                  </div>
                  <div   className={styles['feetbarContent_middle3']}> 
                 
                   
                  </div>
                  <div   className={styles['feetbarContent_middle4']}> 
                 
                   
                  </div> */}
                  {/* <div   className={styles['feetbarContent_circle_right']}> 
                      
                  </div> */}
               
            </div>
            
            </div>
            
       </section>
       



    </div>
  )
}

export default ExploreContent
