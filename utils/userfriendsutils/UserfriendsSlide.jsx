import React, { useEffect, useState } from 'react'
import styles from "@styles/userFriends.module.css"
import {debounce} from 'lodash'
import Image from 'next/image'
import { da } from 'date-fns/locale'





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

    const handleToggleInput = ()=> {
        setInputSectionToggle(!inputSectionToggle)
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
            console.log('init');
            
            if(searchfriendsvalue){
                console.log('init2')
                const resUserData = await fetchsearchFriend(searchfriendsvalue)
                setCloseFriendsData(resUserData)
           
                console.log(resUserData.message)
                if(resUserData?.length === 1){
                    console.log('init4');
                    setotherUserIdData(resUserData[0].userFollowed)
                

                }else{
                    setUserImgUrl("")
                    setotherUserIdData("")
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

    
    const fetchUserData = async() => {

        if(otherUserIdData !== ""){
            console.log('init3');
            console.log(otherUserIdData);
            try{
                // console.log(otherUserIdData)
                const userImgUrl = await fetchUserImg(otherUserIdData)
                setUserImgUrl(userImgUrl)
               
             
            }catch(error){
                console.error("Fetch error on response userImgUrl: ", error)
            }   
        //  console.log(userImgUrl, "url");
        }else{
            // setUserImgUrl("")
            // setUserExistPopup(false);
        }

     }

    // debounce will execute the api request after a timeslot of 500 ms after the user types the character
    const debounceCloseFriendsFetch = debounce(fetchuserDataforcloseFriends, 200)
    // const debounceImgUrl = debounce(fetchUserData, 500)

     // debounce is based on the input, so every time there is certain pause the funciton will be executed 
    debounceCloseFriendsFetch(searchfriendsvalue)
    // debounceImgUrl(otherUserIdData)


    
    //  // Interval for a periodic fetch 
     const intervalId = setInterval(() => {
        fetchUserData()
      }, 5000)
    
    // // inital fetch 
      fetchUserData()

      return () => {
        clearInterval(intervalId);
        debounceCloseFriendsFetch.cancel()
        // debounceImgUrl.cancel()

      }

    


   },[searchfriendsvalue, otherUserIdData])




  return (
    <div className={styles["friendsSlideLayer"]}>
        <div className={styles["friendsSlideSection"]} >
            <div  className={styles["friendsSlideSection_left"]}>
                <div className={styles["friendsSlideSection_Icon"]} onClick={handleToggleInput}>
                    
                </div>
                <div >
                    {inputSectionToggle && (
                        <div className={styles["friendsSlidepopLayer"]}>
                            <div>
                            <input type="text" className={styles["friendsSlideSection_Input"]} onChange={handleInput}  />         
                            </div>

                             <div  className={styles["friendsSlideDisplaySection"]}>
                                { userImgUrl && (
                                    <div>
                                     <Image src={`/${userImgUrl.pictureUrl}`}  className={styles["userImgUrl"]} width={35} height={35} quality={100}/>
                                    </div>
                                )}

                                {userExitPopup &&(
                                    <div> user does not exist</div>
                                )}
                             </div>
                        </div>

                       
                    )} 
                </div>
            </div>
            <div>
                
            </div>
            djfhfd
        </div>
      
    </div>
  )
}

export default UserfriendsSlide
