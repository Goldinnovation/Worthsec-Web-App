import React, { useEffect, useState } from 'react'
import styles from "@styles/userFriends.module.css"
import {debounce} from 'lodash'




const fetchsearchFriend = async(searchfriendsvalue) => {
    try{
        const res = await fetch(`http://localhost:3000/api/searchforclosefriends`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({searchfriendsvalue})

    })
    if(!res.ok){
        throw new Error('Invalid res on fetchsearchFriend ')
    }

    const data = res.json()
    return data


    }catch(error){
        console.log('Failed to fetch the data on api: fetchsearchFriend - client side')
    }

}




const UserfriendsSlide = () => {

    const [inputSectionToggle, setInputSectionToggle] = useState(true)
    const [searchfriendsvalue, setSearchFriendValue] = useState(null)
    const [closeFriendsData, setCloseFriendsData] = useState(null)
    const [otherUserIdData, setotherUserIdData] = useState(null)


    const handleToggleInput = ()=> {
        setInputSectionToggle(!inputSectionToggle)
    }

    const handleInput = (e) => {
        const value = e.target.value
        setSearchFriendValue(value)


    }



   useEffect(() => {


    //  const fetchUserData = async() => {

    //     if()
    //  }





    const fetchuserDataforcloseFriends =  async() => {
        try{
            const resUserData = await fetchsearchFriend(searchfriendsvalue)
            setCloseFriendsData(resUserData)

           
            if(resUserData?.length > 0){
                // setotherUserIdData(resUserData[0])
                console.log(resUserData)
            }



        }catch(error){

            console.log('Error on requesting fetchuserDataforcloseFriends', error)
        }
    }

    // debounce will execute the api request after a timeslot of 500 ms after the user types the character
    const debounceCloseFriendsFetch = debounce(fetchuserDataforcloseFriends, 500)

     // debounce is based on the input, so every time there is certain pause the funciton will be executed 
    debounceCloseFriendsFetch(searchfriendsvalue)


    
    
    

    


   },[searchfriendsvalue])




  return (
    <div className={styles["friendsSlideLayer"]}>
        <div className={styles["friendsSlideSection"]} >
            <div  className={styles["friendsSlideSection_left"]}>
                <div className={styles["friendsSlideSection_Icon"]} onClick={handleToggleInput}>
                    
                </div>
                <div >
                    {inputSectionToggle && (
                        <div>
                             <input type="text" className={styles["friendsSlideSection_Input"]} onChange={handleInput}  />
                        </div>
                    )}
                   
                </div>
            </div>
            <div>
                dksdk
            </div>
            djfhfd
        </div>
      
    </div>
  )
}

export default UserfriendsSlide
