import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import searchIcon from '@assets/search.png'
import xMarkerIcon from '@assets/Xmarker.png'
import InviteFriendsToEventAPI from "@components/componentsAPI/InviteFriendsToEventAPI";




const fetcher = (url) => fetch(url).then((res) => res.json());

const InviteUsertoEvent = () => {
  const [closeFriends, setCloseFriends] = useState(null);
  const [searchToggel, setSearchToggle] = useState(false)
  const [selectfriends, setSelectfriends] = useState(null)
  const [friendsArr, setFriendsArr] = useState([])
  const [collectFirends, setCollectedFriends] = useState(false)
  const [checkInvitationStatus, setCheckInvitationStatus] = useState(false)




  const handleSelectFriends = (event) => {
    setSelectfriends(selectfriends === event ?  null : event)
    setFriendsArr((prevArr) => {
    
      if(prevArr.includes(event.userId)){
        return prevArr.filter((id) => id !== event.userId)
      }else {
        return [...prevArr, event.userId]
      }
    })

  }


 



  const { data: currentUserCloseFriends, error } = useSWR(
    "http://localhost:3000/api/invite",
    fetcher
  );

  
  const handleSearchPopUp = () => { 
    setSearchToggle(!searchToggel)
}

const handlefriendsInvitation = (e) => {
  console.log('hallo');
  e.preventDefault();
  setCollectedFriends(true);
  

}




  // setCloseFriends(currentUserCloseFriends[0].picture)
  // console.log(currentUserCloseFriends.length)
  return (
    <div className="invitelayer">
      <div>
            <div  className='userInviteSearch'>

              <div className='search_closeFriends_PopUpIcon'>
              <Image src={searchIcon} height={20} width={20} onClick={handleSearchPopUp} alt="search Icon"/>

              </div>
              <div className='seach_closeFirends_input'>
              {searchToggel && (
                  <div className='userInviteSearchArea'>
              <input type="text" className="userInviteInput"  placeholder="  Search for friends"/>
                  

                  </div>
              )}
              </div>
            </div>
      </div>
      <div className="closefriends_Section">
      
          {currentUserCloseFriends?.map((event, i) => (
            <div key={i} className="closeFriendsInviteSection"  >
              <div className="closefriends_Item" onClick={ () => handleSelectFriends(event)}>
                <div className="closefriends_Content">
                  <Image
                   src={`/${event.picture.pictureUrl}`}
                    className="inviteCloseFriends_ProfilImg"
                    width={55}
                    height={55}
                    alt="inviteCloseFriends_ProfilImg"
                    priority = {true}
                  />
                 
                  {friendsArr.includes(event.userId) && (
                    <div className="closefriends_markItem">
                      <Image src={xMarkerIcon} height={35} width={35} alt="marker Icon"/>
                    </div>
                  )}


        
                  <div className="closefriends_title">{event.userName}</div>

                 
                </div>
                
               
              </div>
             
            </div>
          ))}
           
      
      </div>
      <form onSubmit={handlefriendsInvitation}> 
      <div className="send_btn_layer">
        <button type="submit" className="closeFriends_sendInvite_btn">Send Invitation</button>
        {collectFirends &&
         <InviteFriendsToEventAPI 
         postData={friendsArr}
         successfulInvitation = {() => setCheckInvitationStatus(true)}
         />}
      </div>
      {checkInvitationStatus && <p>Invitation sent successfully!</p>}
      </form>
    </div>
  );
};

export default InviteUsertoEvent;
