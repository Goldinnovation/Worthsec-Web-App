import React, { useState } from 'react'
import styles from "@styles/userFriends.module.css"








const UserfriendsSlide = () => {

    const [inputSectionToggle, setInputSectionToggle] = useState(true)


    const handleToggleInput = ()=> {
        setInputSectionToggle(!inputSectionToggle)
    }
  return (
    <div className={styles["friendsSlideLayer"]}>
        <div className={styles["friendsSlideSection"]} >
            <div  className={styles["friendsSlideSection_left"]}>
                <div className={styles["friendsSlideSection_Icon"]} onClick={handleToggleInput}>
                    
                </div>
                <div >
                    {inputSectionToggle && (
                        <div>
                             <input type="text" className={styles["friendsSlideSection_Input"]}  />
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
