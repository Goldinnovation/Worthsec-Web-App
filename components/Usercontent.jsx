'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HomeIcon from '@assets/home.png'
import BubbleIcon from '@assets/bubble.png'
import searchIcon from '@assets/search.png'
import styles from '@styles/usercontentstyle.module.css'
import TestImage1 from '@assets/forbes.jpg'
import TestImage2 from '@assets/exo.jpg'
import testted3 from '@assets/ted.jpg'
import testalbum from '@assets/album.jpg'
import Createbtn from '@utils/Createbtn'
import TimeLayer from '@utils/Timebtn'
import Networkbtn from '@utils/Networkbtn'
import Settingsbtn from '@utils/Settingsbtn'
import GetEventContent from './GetEventContent'
import OrangeAddbtn from '@assets/O-add-btn.png'
import { useState } from 'react'
import CalenderContent from './CalenderContent'


const Usercontent = () => {

    const [addArea, setAddArea] = useState(false)
    const [calenderArea, setCalenderArea] = useState(true)
    const [networkArea, setNetworkArea] = useState(false)





    const togglemodalCalender = () => { 
        setCalenderArea(true)
        setAddArea(false)
    }

    const togglemodalAddArea = () => { 

        setAddArea(true)
        setCalenderArea(false)
    }


    const togglemodalnetwork = () => {
        setNetworkArea(!networkArea)
        setCalenderArea(false);
        setAddArea(false);
    }

    

  return (
    <div>

       

        <create/>
        <header className={styles['header-area']}>
                    <div>
                        <div className={styles["profil-pic"]}></div>
                        <div className="inputbtn"></div>
                        <button className={styles['image-btn']}>+</button>
                    </div>
                    <nav className={styles['nav-area']}>
                        <ul className={styles['nav-list']}>
                                <li>
                                    <Link href={'/user'}>
                                        <Image src={HomeIcon} alt='HomeIcon' className='HomeIcon' height={30} width={30} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/search'}>
                                        <Image src={searchIcon} alt='searchIcon' className='search-Icon' height={30} width={30}/>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/Community'}>
                                    <Image src={BubbleIcon} alt='BubbleIcon' className='BubbleIcon' height={30} width={30}/>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/Community'}>
                                    <Image src={BubbleIcon} alt='BubbleIcon' className='BubbleIcon' height={30} width={30}/>
                                    </Link>
                                </li>
                        </ul>
                        <hr  id='in_line'/>
                    </nav>
        </header>   
        <hr />
        {/* slider area  */}
        <div className={styles["slider"]}>
                <div className={styles["slide-track"]}>
                    <div className={styles["slide"]}>
                        <Image src={TestImage1} alt="SlideImg"  height={130} width={100}/>
                    </div>
                    <div className={styles["slide"]}>
                        <Image src= {TestImage2} alt="SlideImg" height={130} width={100} />
                    </div>
                    <div className={styles["slide"]}>
                        <Image src={testted3} alt="SlideImg" height={130} width={100}  />
                    </div>
                    <div className={styles["slide"]}>
                        <Image src={testalbum} alt="SlideImg"height={130} width={100}  />
                    </div>

                    {/* <!--Same 9 slide (Doubled)--> */}
                    <div className={styles["slide"]}>
                        <Image src={TestImage1} alt="SlideImg"  height={130} width={100}/>
                    </div>
                    <div className={styles["slide"]}>
                        <Image src= {TestImage2} alt="SlideImg" height={130} width={100} />
                    </div>
                    <div className={styles["slide"]}>
                        <Image src={testted3} alt="SlideImg" height={130} width={100}  />
                    </div>
                    <div className={styles["slide"]}>
                        <Image src={testalbum} alt="SlideImg"height={130} width={100}  />
                    </div>
                    
                </div>
            </div>
            <hr />

            <div className='feed-area'>
                <div className='user-feed-nav'>
                <div className='timeline-btn-area' onClick={togglemodalCalender}><TimeLayer/></div>
                    <div className="btn-area">
                        <button className='add-btn' onClick={togglemodalAddArea}><Image src={OrangeAddbtn} alt='imgbtn' height={20} width={20}/></button>
                    </div>
                    <div className='network-btn-area' onClick={togglemodalnetwork}><Networkbtn/></div>
                    <div className='setting-btn-area'><Settingsbtn/></div>
                    
                </div>
            

            <div className='CalenderContentContainer'>
                {calenderArea && (
                    <div className='CalenderArea'>
                            <CalenderContent/>
                    </div>
                )}

            </div>
            <div className='ContentArea'>
            {addArea && (
            <div className='AddEventContentArea'>
                    <div className='EventContentArea'>
                        <GetEventContent/>
                    </div>
                    <div className='create-addbtn-area'>
                        <Createbtn/>
                    </div>
            </div>
        )}
            </div>
             
                
                
            </div>


      
    </div>
  )
}

export default Usercontent
