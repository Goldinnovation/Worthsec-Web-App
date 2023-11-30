'use client'
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HomeIcon from '@assets/home.png'
import BubbleIcon from '@assets/bubble.png'
import searchIcon from '@assets/search.png'
import styles from '@styles/usercontentstyle.module.css'
import joinandfavorStyle from '@styles/joinandfavorstyle.module.css'
import TestImage1 from '@assets/forbes.jpg'
import TestImage2 from '@assets/exo.jpg'
import testted3 from '@assets/ted.jpg'
import testalbum from '@assets/album.jpg'
import Createbtn from '@utils/Createbtn'
import TimeLayer from '@utils/Timebtn'
import Networkbtn from '@utils/Networkbtn'
import Settingbtn from '@utils/Settingsbtn'
import GetEventContent from './homeComponents/GetEventContent'
import OrangeAddbtn from '@assets/O-add-btn.png'
import { useState } from 'react'
import CalenderContent from './homeComponents/CalenderContent'
import joinIcon from '@assets/heart.png'
import StarIcon from '@assets/star.png'
import Sharebtn from '@utils/Sharebtn'
import strand2 from '@assets/strand2.jpg'
import ViewShared from '@utils/ViewShared'
import mailIcon from '@assets/mail.png'
import messageBtn from '@utils/Messagebtn'
import Messagebtn from '@utils/Messagebtn'
import ReqFriendBtn from '@utils/ReqFriendbtn'
// import { useRouter } from 'next/navigation'
import Userlogout from '@utils/Userlogout'
import UploadProfilImage from '@utils/homeUtils/ProfilImageBtn'




const Usercontent = () => {

    const [addArea, setAddArea] = useState(false)
    const [calenderArea, setCalenderArea] = useState(true)
    const [networkArea, setNetworkArea] = useState(false)
    const [joinArea, setJoinArea] = useState(false)
    const [favorArea, setFavorArea] = useState(false)
    const [addShareArea, setAddShareArea] = useState(false)
    const [viewArea, setViewArea] = useState(false)
    const [messageArea, setMessageArea] = useState(false)
    const [reqfriendArea, setReqFriendArea] = useState(false)
    // const router = useRouter();





    const togglemodalCalender = () => { 
        setCalenderArea(true)
        setAddArea(false)
        setJoinArea(false)
        setNetworkArea(false)
       
    }

    const togglemodalAddArea = () => { 

        setAddArea(true)
        setCalenderArea(false)
        setJoinArea(false)
        setNetworkArea(false)
        
    }


    const togglemodalnetwork = () => {
        setNetworkArea(true)
        setJoinArea(true)
        setCalenderArea(false);
        setAddArea(false);
        setFavorArea(false)
        
        
    }

    const togglejoinaraopt = () => {
        setJoinArea(true)
        setCalenderArea(false);
        setAddArea(false);
        setFavorArea(false)
       


    }

    const togglemessageArea = () => {
        setMessageArea(!messageArea)
        setReqFriendArea(false)
    }

    const togglefriendArea = () => {
        setReqFriendArea(!reqfriendArea)
        setMessageArea(false)
         
    }

    const togglefavoropt = () => {
        setFavorArea(true)
        // setJoinArea(false)
        setCalenderArea(false);
        setAddArea(false);
        

    }

    const toggleaddsharebtn = () => {
        setAddShareArea(!addShareArea)
        setViewArea(false)

    }

    const toggleviewShareArea = () => {
        setViewArea(!viewArea)
        setAddShareArea(false)
    }


    // useEffect(() => {
        
    //     const  fetchData = async () => {
    //         try {
    //             const res = await fetch('http://localhost:3000/api/home', {
    //                 method: 'GET',
    //             });

    //             const data = await res.json();
    //             if (!res.ok) {
    //                 if (data.message === "Authentication failed - redirect to login") {
    //                     // Redirect to the login page if authentication fails
    //                     router.push('/login');
    //                 } else {
    //                     // Handle other errors
    //                     console.error('Failed to fetch user content:', data.message);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch user content:', error);
    //         }
    //     }
        
    //     fetchData();
    // }, [router]);


  return (
    <div>

       

        <create/>
        <header className={styles['header-area']}>
                    <div className={styles['profilMessageHeader']}>
                        <div className={styles["logoWorthsec"]}>
                            <button className={styles['worthsecAreabtn']} disabled>WORTHSEC</button>
                        </div>
                        <div className={styles['userLogout']}><Userlogout/></div>
                    </div>
                    <div className={styles['profilpicArea']}>
                        
                        <div className={styles['addProfilpicbtn']}><UploadProfilImage/></div>
                        
                        {/* <button className={styles['addProfilpicbtn']}>+sd</button> */}

                    </div>
                
                    {/* <div className={styles['logoutbtn']}><logout/></div> */}
                    {/* <div className={styles['invitationArea']}> 
                        <button className={styles['requestbtnAreabtn']} onClick={toggleRequestArea}><Image src={mailIcon} height={25} width={25}/></button>
                        </div>
                        <div className={styles['InvitepopUpSection']}>
                            {requestArea && (
                                <div className={styles['InvitePopup']}>hallo</div>
                            )}
                        </div> */}
                    {/* <div className={styles['profilpicArea']}>
                        <div className={styles['profilpicContent']}>hallo</div>
                        <button className={styles['addProfilpicbtn']}>+</button>

                    </div> */}
                    
                    
                    <nav className={styles['nav-area']}>
                        <ul className={styles['nav-list']}>
                                <li>
                                    <Link rel='preload' href={'/user'}>
                                        <Image src={HomeIcon} alt='HomeIcon' className='HomeIcon' height={30} width={30} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/explore'}>
                                    <Image src={BubbleIcon} alt='BubbleIcon' className='BubbleIcon' height={30} width={30}/>
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
                        </ul>
                        <hr  id='in_line'/>
                    </nav>
                    
                    

        </header>   
        <hr />
        
        {/* slider area  */}
        <div className= {styles['sliderSection']}> ´

         <div className ={styles['RequestSection']}>

                <div className={styles['requestmessageSection']}>
                  <div className={styles['reqMessageBtn']} onClick={togglemessageArea}>
                        <Messagebtn/>
                    </div>  
                </div>

                <div className={styles['requestFriendSection']} >
                    <div className={styles['reqFriendBtn']} onClick={togglefriendArea}>
                        <ReqFriendBtn/>
                    </div>
                </div>
       </div>

        
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
             <div className ={styles['sharebtnSection']}>

                <div className={styles['add-share-btn-area']}>
                  <div className={styles['add-share-btn']} onClick={toggleaddsharebtn}>
                        <Sharebtn/>
                    </div>  
                </div>

                <div className={styles['view-sharedEvent-btn-area']} >
                    <div className={styles['view-sharedEvent-btn']} onClick={toggleviewShareArea}>
                        <ViewShared/>
                    </div>
                </div>
             </div>

             
        </div>
       
            <hr />


            {/* Pop up section  for the areas over the slide*/}

            <div className={styles['messagePopUpSection']}>
                {messageArea &&(
                    <div className={styles['messagePopUpContentArea']}>
                        hallo
                    </div>
                )}
            </div>

            <div className={styles['reqFriendPopUpSection']}>
                {reqfriendArea && (
                    <div className={styles['reqFriendPopUpContentArea']}>
                        hall2
                    </div>
                )}
            </div>

             <div className={styles['SharePopupArea']}>
            {addShareArea && (
                <div className={styles['sharePop']}>
                    <div className={styles['shareBackground']}><Image src={strand2} height={285} width={487}/></div>
                    <div className={styles['shareContentArea']}></div>
                </div>
            )}

            <div className={styles['ViewPopupArea']}>
                {viewArea && (
                    <div className={styles['ViewPopup']}>

                    </div>
                )}
            </div>
        </div>
        
            <div className='feed-area'>
                <div className='user-feed-nav'>
                <div className='timeline-btn-area' onClick={togglemodalCalender}><TimeLayer/></div>
                    <div className='network-btn-area' onClick={togglemodalnetwork}><Networkbtn/></div>
                    <div className="btn-area">
                        <button className='add-btn' onClick={togglemodalAddArea}><Image src={OrangeAddbtn} alt='imgbtn' height={20} width={20}/></button>
                    </div>
                    {/* <div className='setting-btn-area' onClick={togglemodelshare}><Settingbtn/></div> */}
                   
                    
                </div>
            

            <div className='CalenderContentContainer'>
                {calenderArea && (
                    <div className='CalenderArea'>
                            <CalenderContent/>
                    </div>
                )}
            </div>

            {/* create Event Secetion, by pressing the button user creates an event*/}

            <div className='addEventSection'>
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

            {/* The user can view all the events he/she liked and joined */}
            <div className={joinandfavorStyle['joinAndFavorSection']}>
                {networkArea && (
                    <div className={joinandfavorStyle['joinandFavorarea']}>
                            <div className={joinandfavorStyle['JoinandFavor-navbar']}>
                                <div className={joinandfavorStyle['join-opt-btn']} onClick={togglejoinaraopt}><Image src={joinIcon} height={25} width={25}/></div>
                                <div className={joinandfavorStyle['favor-opt-btn']} onClick={togglefavoropt}><Image src={StarIcon} height={25} width={25}/></div>
                            </div>
                            
                            <div className={joinandfavorStyle['joinContentSection']}>
                                {joinArea &&(
                                    <div className={joinandfavorStyle['joinContent-area']}>
                                        <p>hallo</p>
                                    </div>
                                )}
                               
                            </div>
                            <div className={joinandfavorStyle['favorContentSection']}>
                            {favorArea && ( 
                                    <div className={joinandfavorStyle['favorContent-area']}>
                                        favor
                                    </div>
                                )}
                                
                            </div>

                    </div>
                )}
            </div>
            {/* <div className='ShareSection'>
                {shareArea && (
                    <div className='shareArea'>
                        <div className='ShareSelectedArea'>Selected</div>
                        <div className='shareAtomArea'>Atom</div>
                        <div className='ShareDragArea'>hallo</div>
                        
                        
                    </div>
                )}
            </div> */}
             
                
                
            </div>


      
    </div>
  )
}

export default Usercontent
