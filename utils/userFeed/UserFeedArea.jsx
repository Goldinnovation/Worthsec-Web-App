import React from 'react'
import { useState } from 'react'
import joinIcon from '@assets/heart.png'
import StarIcon from '@assets/star.png'
import Createbtn from '@utils/Createbtn'
import GetEventContent from '@components/homeComponents/GetEventContent'
import CalenderContent from '@components/homeComponents/CalenderContent'
import OrangeAddbtn from '@assets/O-add-btn.png'
import joinandfavorStyle from '@styles/joinandfavorstyle.module.css'
import TimeLayer from '@utils/Timebtn'
import Networkbtn from '@utils/Networkbtn'
import Image from 'next/image'
import DisplayJoinEvent from './DisplayJoinEvent'



const UserFeedArea = () => {
    const [addArea, setAddArea] = useState(false)
    const [calenderArea, setCalenderArea] = useState(false)
    const [networkArea, setNetworkArea] = useState(true)
    const [joinArea, setJoinArea] = useState(true)
    const [favorArea, setFavorArea] = useState(false)

    
    // open up the Pop up of  the calender and closes all other toggle 

    const togglemodalCalender = () => { 
        setCalenderArea(true)
        setAddArea(false)
        setJoinArea(false)
        setNetworkArea(false)
       
    }

    // open up the Pop up of the create event area and closes all other toggle 

    const togglemodalAddArea = () => { 

        setAddArea(true)
        setCalenderArea(false)
        setJoinArea(false)
        setNetworkArea(false)
        
    }

   // open up the Pop up of the network area and closes all other toggle 

    const togglemodalnetwork = () => {
        setNetworkArea(true)
        setJoinArea(true)
        setCalenderArea(false);
        setAddArea(false);
        setFavorArea(false)

        
    }

    // open up the Pop up of the join area and closes all other toggle 


    const togglejoinaraopt = () => {
        setJoinArea(true)
        setCalenderArea(false);
        setAddArea(false);
        setFavorArea(false)

        
    }

    const togglefavoropt = () => {
        
        setFavorArea(true)
        setNetworkArea(true)
        setJoinArea(false)
        setCalenderArea(false);
        setAddArea(false);
        
        

    }
  return (
    <div>


           <div className='feed-area'>
               <div className='user-feed-nav'>
               <div className='timeline-btn-area' onClick={togglemodalCalender}><TimeLayer/></div>
                   <div className='network-btn-area' onClick={togglemodalnetwork}><Networkbtn/></div>
                   <div className="btn-area">
                       <button className='add-btn' onClick={togglemodalAddArea}><Image src={OrangeAddbtn} alt='imgbtn' height={20} width={20}/></button>
                   </div>
                  
                   
               </div>
               
           

           <div className='CalenderContentContainer'>
               {calenderArea && (
                   <div className='CalenderArea'>
                           <CalenderContent/>
                   </div>
               )}
           </div>


           <div className='netwerokContentSection'>
            {networkArea && (
                <div className='NetworkContentArea'>
                    <div className='favorcontnetArea'>

                        <div className='favorandjoinbar'>
                            <div className='joinoptionbtnArea'>
                                    
                            <button className='joinoptionbtn' onClick={togglejoinaraopt}>J</button>
                            </div>
                            <div className='favoroptionbtnArea'>
                                <button className='favoroptionbtn' onClick={togglefavoropt}>F</button>
                            </div>

                        </div>
                        
                        <div className='joindisplayContentSection' >
                        {joinArea &&(
                                 <div className='joindisplayContentArea'>
                                    <div className='joincontnetArea_left'>
                                        <DisplayJoinEvent/>
                                    </div>
                                    
                                    {/* <div className='displaycontnetArea_middle'>
                                       
                                        
                                    </div>
                                    <div className='favorcontnetArea_right' >
                                        right
                                     </div>  */}
                                </div>
                               )}

                        </div>
                       
                       <div className='favorSectionArea'>
                       {favorArea && ( 
                                   <div className="favordisplaySection">
                                      <div className='favorContent'>
                                        wew
                                      </div>
                                   </div>
                                 )}
                                

                       </div>
                               
                              
                              
                              
                    </div>
                   
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
                   <div className='chatContentArea'>
                        hallo
                   </div>
                   {/* <div className='create-addbtn'>
                       <Createbtn/>
                     </div> */}
                  
           </div>
            )}
           </div>

           {/* The user can view all the events he/she liked and joined */}
           {/* <div className={joinandfavorStyle['joinAndFavorSection']}>
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
           </div> */}
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

export default UserFeedArea
