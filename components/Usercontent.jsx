'use client'
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
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
import UserfriendsSlide from '@utils/userfriendsutils/UserfriendsSlide'
import setting from '@assets/Coversetting.png'
import worldIcon from '@assets/worldIcon.svg'
import notificationIcon from '@assets/notifi.png'
import DisplayNotifications from '@utils/header/DisplayNotifications'
import SettingIcon  from '@assets/setting3d.png'
import MailIcon from '@assets/Mail3d.png'
import Search3dIcon from '@assets/search3d.png'


const Usercontent = () => {

    
    // const [showNav, setShowNav] =  useState(true)
    const [searchArea, setSearchArea] = useState(false)
    const [explorePage, setExplorePage] = useState(true)
    const [homePage, setHomePage] = useState(false)
    const [optionToggle, setOptionToggle] = useState(false)
    const [notifcation, setNotification] = useState(false)
    const [connectUserToggle, setConnectUserToggle] = useState(false)
    const [eventInvitesToggle, setEventInvitesToggle] = useState(false)



    // const router = useRouter();




   
    const handleToggleSearch = () => {

        setSearchArea(!searchArea)
        setOptionToggle(false)
        setNotification(false)
        setConnectUserToggle(false)
        setEventInvitesToggle(false)


    }

    const exploreToggle = () =>  {
        setExplorePage(true)
        setHomePage(false)
        setSearchArea(false)
        setNotification(false)
        setConnectUserToggle(false)
        setEventInvitesToggle(false)



    }

    const homeToggle = () => {
        setHomePage(true)
        setExplorePage(false)
        setSearchArea(false)
        setNotification(false)
        setConnectUserToggle(false)
        setEventInvitesToggle(false)

    }


    const handleOptionToggle = () => {
        setOptionToggle(!optionToggle)
        setSearchArea(false)
        setConnectUserToggle(false)
        setEventInvitesToggle(false)
        setNotification(false)


    }


    const handleNotification = () => {
        setNotification(!notifcation)
        setConnectUserToggle(false)
        setSearchArea(false)
        setEventInvitesToggle(false)
        setOptionToggle(false)

    }

    const handleToggleConnect = () => {
        setConnectUserToggle(true)
        setEventInvitesToggle(false)
    }
    

    const handleToggleEventInvite = () => {
        setEventInvitesToggle(true)
        setConnectUserToggle(false)
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
                            // src={Search3dIcon}
                            // alt="searchIcon"
                            // className="search-Icon"
                            // height={25}
                            // width={25}
                            // onClick={handleToggleSearch}
                        />
                                   
                        </div>
                        <div className={styles['worldmessageSection']}>
                                    <Image src={notificationIcon} width={23} height={25} alt='World Icon' onClick={handleNotification}/>
                                    {/* <Image src={MailIcon} width={25} height={25} alt='World Icon' onClick={handleNotification}/> */}

                        </div>
                                
                        <div className={styles['settingOption']}>
                                <Image src={setting}  alt='Setting Icon' height={20} width={20}   onClick={handleOptionToggle}/>
                                {/* <Image src={SettingIcon}  alt='Setting Icon' height={25} width={25}   onClick={handleOptionToggle}/> */}


                               
                        </div>
                        <div>
                       
                        {notifcation && (
                                    <div className={styles['notificationOptionSection']}>
                                        {/* <DisplayNotifications/> */}
                                        <div>
                                                <button onClick={handleToggleConnect}>1</button>
                                        </div>
                                        <div>
                                                <button onClick={handleToggleEventInvite}>2</button>
                                        </div>

                                    </div>
                        )}

                        {
                            connectUserToggle && (
                                <div className={styles['notification_display_connectedUser']}>  
                                <DisplayNotifications/>
                                </div>
                            )
                        }
                        {
                            eventInvitesToggle && (
                                <div className={styles['notification_display_eventInvite']}> trap</div>
                            )
                        }
                        
                       
                        {optionToggle && (
                                    <div className={styles['userOptionLayer']}>
                                        <div className={styles['userOptionUpper']}>
                                             <ProfilImageBtn/>
                                            
                                        </div>
                                        <div  className={styles['userOptionlower']}>
                                             <Userlogout/>
                                        </div>
                                        
                                    </div>
                                )}
                        </div>
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
                
                        <UserfriendsSlide/>                
                    </div>
                     {/* Feed Area */}
                 <div className='overFeedlayer'>
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
