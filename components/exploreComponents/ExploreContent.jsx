import React, { useState } from 'react'
import styles from '@styles/exploreStyle/explore.module.css'
import GlobalHeader from '@utils/globalheader/GlobalHeader'



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
  return data


  }catch(error){
    console.log('GetallEventsWorldWide:', error)
    // throw Error('Request Error on Fetch: GetallEventsWorldWide')
  }

}

const ExploreContent = () => {

  
  const [rangeValue, setrangeValue] = useState(9)
  const [selectedValues, setSelectedValues] = useState({
    explore_selectTypeofEvent__bmewZ:"3",
    selectedRangeofEvents: "9",
    explore_selectTypeofEventCategory__KzDeU: "3"
    



  })

  const handleInput = (e) => {

    if(e.target.className === "selectedRangeofEvents" && e.target.value){

      setrangeValue(e.target.value)
    }
    


    setSelectedValues({...selectedValues, [e.target.className]: e.target.value})

  }







  return (
    <div>
      
       <section className={styles['middleSection']}>
            <div className={styles['middleContentarea']}>
              
                
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
                  <div>
                    <button className="startselectSearch" onClick={() => getallEventsWorldwide(selectedValues)}>Start</button>
                  </div>
               
              

                </div>
                
            </div>
            <div className={styles['middleContentArea']}>
           sds
            </div>
            
       </section>
       



    </div>
  )
}

export default ExploreContent
