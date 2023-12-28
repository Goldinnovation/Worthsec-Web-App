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

    
    const [showNav, setShowNav] =  useState(true)
    const [searchArea, setSearchArea] = useState(false)
    const [explorePage, setExplorePage] = useState(false)
    const [homePage, setHomePage] = useState(true)

    // const router = useRouter();




    const handleToggle = () => {
        setShowNav(!showNav)
    }

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

       

        <create/>
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
                    <div>

                        
            {/* Navbar section */}
            <div className="NavbarLayer">
                {showNav && (
                          <div className="leftNavbar">
                            <div className='homeIconOpt'>
                            <Link rel="preload" href={"/user"}>
                              <Image
                                  src={HomeIcon}
                                  alt="HomeIcon"
                                  className="HomeIcon"
                                  height={25}
                                  width={25}
                                  onClick={homeToggle}
                              />
                          </Link>
                        </div>
                      </div>
                )}
              
                <div className="middleNavbar" onClick={handleToggle}>
                    <DisplayProfiIImage />
                </div>
                {showNav && (
                    <div className="rightNavbar">
                   
                    <div className='exploreIconOpt'>
                              <Image
                                  src={BubbleIcon}
                                  alt="BubbleIcon"
                                  className="BubbleIcon"
                                  height={25}
                                  width={25}
                                  onClick={exploreToggle}
                              />
                    </div>
                    
                </div>

                )}
            </div>
                    </div>
                    <div>
                        <ProfilImageBtn/>
                    </div>
                    <div className={styles['userRequestSection']}>
                        <div className={styles['userRequestContent']}>
                        <div>Invites</div>
                         <div>Message</div>
                         <div>FriendRequest</div>

                        </div>
                     
                    </div>
                    
                   
                    
        </header>  

        <div className='userPageOptions'>
            {homePage && (
                <div>
                 {/* Slider Area  */} 
                 <div>
                 <Sliderbar/> 
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
