'use client'
import React from 'react'
import { useEffect } from 'react'
// import Image from 'next/image'
// import searchIcon from '@assets/search.png'
// import styles from '@styles/usercontentstyle.module.css'
import { useState } from 'react'
// import Userlogout from '@utils/Userlogout'
// import ProfilImageBtn from '@utils/homeUtils/ProfilImageBtn'
// import DisplayProfiIImage from "@utils/homeUtils/DisplayProfiIImage";
// import SearchInput from '@utils/searchutils/SearchInput'
// import Sliderbar from '@utils/sliderutils/Sliderbar'
// import UserFeedArea from '@utils/userFeed/UserFeedArea'
// import ExploreContent from './exploreComponents/explorePageStructure'
// import UserfriendsSlide from '@utils/userfriendsutils/UserfriendsSlide'
// import setting from '@assets/Coversetting.png'
// import worldIcon from '@assets/worldIcon.svg'
// import notificationIcon from '@assets/notifi.png'
// import DisplayNotifications from '@utils/header/DisplayNotifications'
// import SettingIcon  from '@assets/setting3d.png'
// import MailIcon from '@assets/Mail3d.png'
// import Search3dIcon from '@assets/search3d.png'
// import style from "../styles/global.css"
// import LeftnavBarContent from './Leftnavbar/navBarContent'
// import UserMenu from './userMenu/userMenu'
// import UploadGif from '@/utils/homeUtils/uploadGif'


const Usercontent = () => {

    
    // const [showNav, setShowNav] =  useState(true)
    const [searchArea, setSearchArea] = useState(false)
    const [explorePage, setExplorePage] = useState(true)
    const [homePage, setHomePage] = useState(false)
    const [optionToggle, setOptionToggle] = useState(false)
    const [notifcation, setNotification] = useState(false)
    const [connectUserToggle, setConnectUserToggle] = useState(false)
    const [eventInvitesToggle, setEventInvitesToggle] = useState(false)
    const [expandUserOption, setExpandUserOption] = useState(true)



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

    const handleExpandUserOptions = () => {
        setExpandUserOption(!expandUserOption)
    }


  return (
   <div style={{
    color: "white"
   }}>
    hallo inside user
   </div>
  )

       

}

export default Usercontent
