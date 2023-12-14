import React from 'react'
import styles from '@styles/exploreStyle/explore.module.css'
import GlobalHeader from '@utils/globalheader/GlobalHeader'

const ExploreContent = () => {
  return (
    <div>
       <header className={styles['Headersection']}>
        <GlobalHeader/>
       </header>
       <section className={styles['middleSection']}>
            <div className={styles['middleContentArea']}>
           
            </div>
            <div className={styles['middleContentbar']}>
                bar
            </div>
       </section>
        <section className={styles['exploreSection']}>
            <div  className={styles['categorySection']}>
            <p>Worldwide</p>
            <p>friends</p>

            </div>
            <div  className={styles['exploreContentArea']}>
                hallo

            </div>

        </section>



    </div>
  )
}

export default ExploreContent
