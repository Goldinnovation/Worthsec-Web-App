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

const ExploreContent = () => {

  
  const [rangeValue, setrangeValue] = useState(9)
  const [userexploreData, setuserExploreData] = useState([])
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
                  <output for="rangeInput" id="outputValue">{rangeValue}</output>

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
                    <Image src={event.ImageCoverUpload} width={200} height={200} quality={100}/>
                </div>
              ))}      
            </div>

            <div className={styles['feedbarSection']}>

                 {/* <div  className={styles['feetbarContent_circle_left']}> 
                     
                  </div> */}
                  <div   className={styles['feetbarContent_middle']}> 
                 
                   
                  </div>
                  <div   className={styles['feetbarContent_middle2']}> 
                 
                   
                  </div>
                  <div   className={styles['feetbarContent_middle3']}> 
                 
                   
                  </div>
                  <div   className={styles['feetbarContent_middle4']}> 
                 
                   
                  </div>
                  {/* <div   className={styles['feetbarContent_circle_right']}> 
                      
                  </div> */}
               
            </div>
            
            </div>
            
       </section>
       



    </div>
  )
}

export default ExploreContent
