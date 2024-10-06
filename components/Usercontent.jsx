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
import ExploreContent from './exploreComponents/explorePageStructure'
import UserfriendsSlide from '@utils/userfriendsutils/UserfriendsSlide'
import setting from '@assets/Coversetting.png'
import worldIcon from '@assets/worldIcon.svg'
import notificationIcon from '@assets/notifi.png'
import DisplayNotifications from '@utils/header/DisplayNotifications'
import SettingIcon  from '@assets/setting3d.png'
import MailIcon from '@assets/Mail3d.png'
import Search3dIcon from '@assets/search3d.png'
import style from "../styles/global.css"
import NavBarContent from './Navbar/navBarContent'


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

    const handleExploreToggle = () =>  {
        setExplorePage(true)
        setHomePage(false)
        setSearchArea(false)
        setNotification(false)
        setConnectUserToggle(false)
        setEventInvitesToggle(false)



    }

    const handProfileToggle = () => {
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
    <div className='min-h-full flex-1 ' >

       

        {/* <create/> */}
        <header 
        className="flex  h-[4vh] md:h-[5vh] bg-black lg:h-[5vh] bg-opacity-50 xl:h-[6vh] border-b border-gray-300  items-center"
        >

            {/* Logo Section  */}
                    <div className=" h-[4vh] w-full flex justify-between  ">
                        <div className="min-h-full w-1/6 ml-5 flex items-center"  >
                            {/* <button className={styles['worthsecAreabtn']} disabled>WORTHSEC</button> */}
                            <h1 className='text-white text-bold text-xl '>WORTHSEC</h1>
                        </div>

                        <div className="flex  items-center  justify-end gap-7 pl-1   md:w-1/6 ">
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
                            height={18}
                            width={18}
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
                                    <Image src={notificationIcon} width={20} height={20} alt='Noftification' onClick={handleNotification}/>
                                    {/* <Image src={MailIcon} width={25} height={25} alt='World Icon' onClick={handleNotification}/> */}

                        </div>
                                
                        <div className={styles['settingOption']}>
                                <Image src={setting}  alt='Setting Icon' height={18} width={18}   onClick={handleOptionToggle}/>
                                {/* <Image src={SettingIcon}  alt='Setting Icon' height={25} width={25}   onClick={handleOptionToggle}/> */}


                               
                        </div>
                        <div className={styles['settingOption']}>
                                <Image src={setting}  alt='Setting Icon' height={18} width={18}   onClick={handleOptionToggle}/>
                                {/* <Image src={SettingIcon}  alt='Setting Icon' height={25} width={25}   onClick={handleOptionToggle}/> */}


                               
                        </div>
                        <div className={styles['settingOption']}>
                                <Image src={setting}  alt='Setting Icon' height={18} width={18}   onClick={handleOptionToggle}/>
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

        {/* Middle Section */}
        <div className='flex  h-[95vh] w-full'>
            <div className='w-[4%] bg-black flex flex-col border-r  bg-opacity-50 border-gray-300 ' >

                <div className='h-[80vh]  w-full '>
                <NavBarContent 
                handleExploreToggle={handleExploreToggle}
                handProfileToggle={handProfileToggle} 
                 />
                </div>
                <div>
                    sd
                </div>
                
                 
            </div>
            <div className='w-[92%] '>
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
            <div className='w-[4%]  bg-black border-l bg-opacity-50' >3</div>
            
            {/* <div className='userInfoLayer'>4</div> */}

        </div>

        {/* <div className='h-[5vh]'>sdsd</div> */}

        
                     {/* Navbar section */}
            {/* <div className='ProfilNavAreaContent'>         
            
            <div className="middleNavbar" >
                    <DisplayProfiIImage />
            </div>
            <div className='NavbarMenu' >   
                       <button className='homebtn' onClick={homeToggle}>H</button>

                       <button className='explorebtn' onClick={exploreToggle}>E</button>
            </div>  
              
            </div> */}


       
    </div>
  )
}

export default Usercontent
