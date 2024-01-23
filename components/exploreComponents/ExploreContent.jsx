import React from 'react'
import styles from '@styles/exploreStyle/explore.module.css'
import GlobalHeader from '@utils/globalheader/GlobalHeader'

const ExploreContent = () => {
  return (
    <div>
      
       <section className={styles['middleSection']}>
            <div className={styles['middleContentarea']}>
                
                <div className={styles['middleContentbar']}>
                  <div className={styles['selectContentTypeofEventbar']}>
                  <select className={styles['selectTypeofEvent']}  required>
                          <option value=''  className={styles['event-type-content']} >Event-type</option>
                          <option value="1">Exhibiton</option>
                          <option value={2}>House party</option>
                          <option value={3}>Club Party</option>         
                </select>
                  </div>
                  <div>
                <input type="range" name="" id="" />

                  </div>
                  <div className={styles['selectContentCategorybar']}>
                  <select className={styles['selectTypeofEventCategory']}  required>
                          <option value=''  className={styles['event-Category-content']} >Event Category</option>
                          <option value="1">only friends</option>
                          <option value={2}>friends++</option>
                          <option value={3}>WorldWide</option>         
                </select>

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
