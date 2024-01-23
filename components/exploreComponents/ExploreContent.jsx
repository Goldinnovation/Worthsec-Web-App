import React, { useState } from 'react'
import styles from '@styles/exploreStyle/explore.module.css'
import GlobalHeader from '@utils/globalheader/GlobalHeader'

const ExploreContent = () => {

  
  const [rangeValue, setrangeValue] = useState(15)
  const [selectedValues, setSelectedValues] = useState({
    selectTypeofEvent: "",
    selectedRangeofEvents: "",
    selectTypeofEventCategory: "",
    startselectSearch: ""



  })

  const handleInput = (e) => {

    if(e.target.className === "selectedRangeofEvents" && e.target.value)
    setrangeValue(e.target.value)


    setSelectedValues( selectedValues => {return {...selectedValues, [e.target.className]: e.target.value}})
    
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
                  <input type="range" id="rangeInput"  className='selectedRangeofEvents'  onChange={handleInput} min="15" max="35" value={rangeValue} />
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
                    <button className="startselectSearch">Start</button>
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
