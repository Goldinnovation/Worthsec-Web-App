import React from 'react'
import styles from '@styles/sliderStyle/sliderbar.module.css'
import { useState } from 'react'
import Messagebtn from '@utils/Messagebtn'
import ReqFriendBtn from '@utils/ReqFriendbtn'
import TestImage1 from '@assets/forbes.jpg'
import TestImage2 from '@assets/exo.jpg'
import testted3 from '@assets/ted.jpg'
import testalbum from '@assets/album.jpg'
import Sharebtn from '@utils/Sharebtn'
import strand2 from '@assets/strand2.jpg'
import ViewShared from '@utils/ViewShared'
import Image from 'next/image'


const Sliderbar = () => {

    const [messageArea, setMessageArea] = useState(false)
    const [reqfriendArea, setReqFriendArea] = useState(false)
    const [addShareArea, setAddShareArea] = useState(false)
    const [viewArea, setViewArea] = useState(false)







    const togglemessageArea = () => {
        setMessageArea(!messageArea)
        setReqFriendArea(false)
    }


    
    const togglefriendArea = () => {
        setReqFriendArea(!reqfriendArea)
        setMessageArea(false)
         
    }

    const toggleaddsharebtn = () => {
        setAddShareArea(!addShareArea)
        setViewArea(false)

    }

    const toggleviewShareArea = () => {
        setViewArea(!viewArea)
        setAddShareArea(false)
    }


  return (
    <div>
         <hr />
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



   
--------------------------------------------------------------------------------


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
<hr />


      
    </div>
  )
}

export default Sliderbar
