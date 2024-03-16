import React, { useEffect, useState } from 'react'
import styles from "@styles/userFriends.module.css"
import {debounce} from 'lodash'
import Image from 'next/image'
import { da } from 'date-fns/locale'
import connectfriendsbubbleIcon from '@assets/confriends.png'





const fetchUserImg = async(otherUserIdData) => {
   try{
    const res = await fetch(`http://localhost:3000/api/searchforclosefriends/${otherUserIdData}`,{
        method: "GET",
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
          }
        
    })
    if(!res.ok){
        throw new Error("Invalid response from fetch:fetchUserImg ")
    }
    const data =  await res.json()
    return data

   }catch(error){
    console.log("Fetch Error on fetchUserImg - closefriendslide",error)

   }
}



const UserfriendsSlide = () => {

    const [inputSectionToggle, setInputSectionToggle] = useState(true)
    const [searchfriendsvalue, setSearchFriendValue] = useState("")
    const [closeFriendsData, setCloseFriendsData] = useState(null)
    const [otherUserIdData, setotherUserIdData] = useState("")
    const [userExitPopup, setUserExistPopup] =  useState(false)
    const [userImgUrl, setUserImgUrl] =useState(null)
    const [messageToggle, setMessageToggle] = useState(false)


    const userMessageToggle = () =>  {
        setMessageToggle(!messageToggle)
    }

    const handleToggleInput = ()=> {
        setInputSectionToggle(!inputSectionToggle)
        setMessageToggle(false)
        setUserImgUrl("")
       

    }

    const handleInput = (e) => {
        const value = e.target.value
        setSearchFriendValue(value)


    }

    
const fetchsearchFriend = async(searchfriendsvalue) => {
    try{
        const res = await fetch(`http://localhost:3000/api/searchforclosefriends`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({searchfriendsvalue})

    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
        if (data.message === "user could not be found") {
          setUserExistPopup(true);
        } 
        return data
    } else {
        throw new Error('Invalid response on fetchsearchFriend');
      }

    } catch (error) {
      console.error('Error during fetchsearchFriend:', error);
      // Handle other error scenarios or log the error message
    }
}
    
   
  




   useEffect(() => {





    const fetchuserDataforcloseFriends =  async() => {
        try{
            
            if(searchfriendsvalue){
                const closeFriendsData = await fetchsearchFriend(searchfriendsvalue)
                setCloseFriendsData(closeFriendsData)
                setUserExistPopup(false);
           
                // console.log(closeFriendsData.message)
                if(closeFriendsData?.length > 0){
                    const userImgUrl = await fetchUserImg(closeFriendsData[0].userFollowed)
                    setUserImgUrl(userImgUrl[0].picture)

                

                }else{
                    setUserImgUrl("")
                    setUserExistPopup(true);

                }
            }else{
                // close the toggle if the input is empty
                setUserImgUrl("")
                setUserExistPopup(false);
           
               
                
            }
            

        }catch(error){

            console.log('Error on requesting fetchuserDataforcloseFriends', error)
        }
        // console.log(otherUserIdData)
    }

    
    

    // debounce will execute the api request after a timeslot of 500 ms after the user types the character
    const debounceCloseFriendsFetch = debounce(fetchuserDataforcloseFriends, 200)
    // const debounceImgUrl = debounce(fetchUserData, 500)

     // debounce is based on the input, so every time there is certain pause the funciton will be executed 
    debounceCloseFriendsFetch(searchfriendsvalue)
    // debounceImgUrl(otherUserIdData)


    
    //  // Interval for a periodic fetch 
    //  const intervalId = setInterval(() => {
    //     fetchUserData()
    //   }, 5000)
    
    // // // inital fetch 
    // fetchUserData()

    //   return () => {
    //     clearInterval(intervalId);
    //     debounceCloseFriendsFetch.cancel()
    //     // debounceImgUrl.cancel()

    //   }

    


   },[searchfriendsvalue, otherUserIdData])




  return (
    <div className={styles["friendsSlideLayer"]}>
        <div className={styles["friendsSlideSection"]} >
            <div  className={styles["friendsSlideSection_left"]}>
                {/* <div className={styles["friendsSlideSection_Icon"]} onClick={handleToggleInput}> */}
                    <button className={styles["closefriends-slider-btn"]}  onClick={handleToggleInput}><Image src={connectfriendsbubbleIcon} width={30} height={30} onClick={handleToggleInput} alt='userslideIcon' quality={100}/></button>
                {/* </div> */}
                <div >
                    {inputSectionToggle && (
                        <div className={styles["friendsSlidepopLayer"]}>
                            <div>
                            <input type="text" className={styles["friendsSlideSection_Input"]} onChange={handleInput}  />         
                            </div>

                             <div  className={styles["friendsSlideDisplaySection"]}>
                                { userImgUrl && (
                                    <div className={styles["userImgUrllayer"]}  onClick={userMessageToggle}>
                                     <Image src={`/${userImgUrl.pictureUrl}`} alt='founded profilImage' className={styles["userImgUrl"]} width={40} height={40}  quality={100}/>
                                    </div>
                                )}

                                <div  className={styles["userdoesnotexistLayer"]}>
                                    {userExitPopup &&(
                                    <div className={styles["userdoesnotexistContent"]}> user does not exist</div>
                                        )}

                                </div>
                               
                             </div>
                        </div>

                       
                    )} 
                
               

                </div>

            </div>
            <div>
                
            </div>
            <div>
                    {messageToggle && (
                        <div className={styles["messageToggleLaver"]}>
                                    <div className={styles["messageToggleupperlayer"]}></div>
                                    <div className={styles["messageToggledownlayer"]}>
                                        <input type="text"  className={styles["messageToggledownlayer_input"]} /> 
                                        {/* <div className={styles["messageToggledownlayer_right"]}></div>                                    */}
                                    </div>
                                    

                        </div>
                    )}

                    
                    {/* <div className={styles["messageToggledownlayer_left"]}> <input type="text" /></div> */}

                     {/* <div  className={styles["messageToggledownlayer_middle"]}>ass</div> */}
                    {/* <div className={styles["messageToggledownlayer_right"]}>asa</div> */}
                </div>sa
            djfhfd
        </div>
      
    </div>
  )
}

export default UserfriendsSlide
