'use client'
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HomeIcon from '@assets/home.png'
import BubbleIcon from '@assets/bubble.png'
import searchIcon from '@assets/search.png'
import styles from '@styles/usercontentstyle.module.css'
import { useState } from 'react'
import Userlogout from '@utils/Userlogout'
import ProfilImageBtn from '@utils/homeUtils/ProfilImageBtn'
import DisplayProfiIImage from "@utils/homeUtils/DisplayProfiIImage";
import SearchInput from '@utils/searchutils/SearchInput'
import Sliderbar from '@utils/sliderutils/Sliderbar'
import UserFeedArea from '@utils/userFeed/UserFeedArea'
import ExploreContent from './exploreComponents/ExploreContent' 



const Usercontent = () => {

    
    // const [showNav, setShowNav] =  useState(true)
    const [searchArea, setSearchArea] = useState(false)
    const [explorePage, setExplorePage] = useState(false)
    const [homePage, setHomePage] = useState(true)

    // const router = useRouter();




   
    const handleToggleSearch = () => {

        setSearchArea(!searchArea)

    }

    const exploreToggle = () =>  {
        setExplorePage(true)
        setHomePage(false)
        setSearchArea(false)

    }

    const homeToggle = () => {
        setHomePage(true)
        setExplorePage(false)
        setSearchArea(false)
    }



  return (
    <div>

       

        {/* <create/> */}
        <header className={styles['header-area']}>

            {/* Logo Section  */}
                    <div className={styles['profilHeader']}>
                        <div className={styles["logoWorthsec"]}>
                            <button className={styles['worthsecAreabtn']} disabled>WORTHSEC</button>
                        </div>

                        <div className={styles['navSideOptions']}>
                            <div className={styles['inputSearchArea']}>
                                {searchArea &&(
                                    <div className={styles['inputSearchOption']}>
                                        <SearchInput/>

                                    </div>
                                )}

                            </div>
                        <div className={styles['searchOption']}>
                        <Image
                            src={searchIcon}
                            alt="searchIcon"
                            className="search-Icon"
                            height={20}
                            width={20}
                            onClick={handleToggleSearch}
                        />
                                   
                        </div>
                        <div className={styles['userLogout']}><Userlogout/></div>

                        </div>
                    </div>          
                                
        </header>  

        
                     {/* Navbar section */}
            <div className='ProfilNavAreaContent'>         
            
            <div className="middleNavbar" >
                    <DisplayProfiIImage />
            </div>
            <div className='NavbarMenu' >   
                       <button className='homebtn' onClick={homeToggle}>H</button>
                       <button className='explorebtn' onClick={exploreToggle}>E</button>
            </div>  
            <div>
                        {/* <ProfilImageBtn/> */}
            </div>        
            </div>

        <div className='userPageOptions'>
            {homePage && (
                <div>
                 {/* Slider Area  */} 
                
                 <div className={styles['sliderAreasectionyLayor']}>
                    {/* <div className={styles['profiloptionContent']}>
                    <div className={styles['userRequestSection']}>
                        <div className={styles['userRequestContent']}>
                        <div><button className={styles['Notificationbtn']}>N</button></div>
                         <div><button className={styles['Messagebtn']}>M</button></div>
                         <div><button className={styles['Friendsbtn']}>F</button></div>

                        </div>
                     
                     </div>

                    </div> */}
                
                 <div className={styles['sliderAreasection']}>
                 <Sliderbar/> 
                 </div>

                 </div>
                 
                 
                 <div className={styles['closefriendsSection']}>
                        <div className={styles['closefriendsContent']}>
                        <div>Ifriend1</div>
                         <div>Ifriend2</div>
                         <div>Ifriend3</div>
                         <div>Ifriend1</div>
                         <div>Ifriend2</div>
                         <div>Ifriend3</div>

                        </div>
                     
                    </div>
                 <div>
                      {/* Feed Area */}
                 <UserFeedArea/>
                 </div>
                </div>
                

            )}


            {explorePage && (
                <div>
                    <div>
                        <ExploreContent/>

                    </div>
                </div>
            )

            }

        </div>
    </div>
  )
}

export default Usercontent
