import React from 'react'
import styles from '@styles/exploreStyle/explore.module.css'

const ExploreContent = () => {
  return (
    <div>
       <header className={styles['navbarsection']}>
        <div className={styles['navbarArea']}> 
        <div className={styles['profilpic']}></div>
        <div className={styles['navbarcontent']}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </div>
       </div>
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
