import React, { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import searchIcon from '@assets/search.png'

const fetcher = (url) => fetch(url).then((res) => res.json());

const InviteUsertoEvent = () => {
  const [closeFriends, setCloseFriends] = useState(null);
  const [searchToggel, setSearchToggle] = useState(false)



  const { data: currentUserCloseFriends, error } = useSWR(
    "http://localhost:3000/api/invite",
    fetcher
  );

  
  const handleSearchPopUp = () => { 
    setSearchToggle(!searchToggel)
}


  // setCloseFriends(currentUserCloseFriends[0].picture)
  // console.log(currentUserCloseFriends.length)
  return (
    <div className="invitelayer">
      <div>
            <div  className='userInviteSearch'>

              <div className='search_closeFriends_PopUpIcon'>
              <Image src={searchIcon} height={20} width={20} onClick={handleSearchPopUp}/>

              </div>
              <div className='seach_closeFirends_input'>
              {searchToggel && (
                  <div className='userInviteSearchArea'>
              <input type="text" className="userInviteInput" />
                  

                  </div>
              )}
              </div>
            </div>
      </div>
      <div className="closefriends_Section">
      
          {currentUserCloseFriends?.map((event, i) => (
            <div key={i} className="closeFriendsInviteSection">
              <div className="closefriends_Item">
                <div className="closefriends_Content">
                  <Image
                   src={`/${event.picture.pictureUrl}`}
                    className="inviteCloseFriends_ProfilImg"
                    width={55}
                    height={55}
                    alt="inviteCloseFriends_ProfilImg"
                  />
                  <div className="closefriends_title">{event.userName}</div>
                </div>
              </div>
            </div>
          ))}
        
        <div></div>
      </div>

      <div className="send_btn_layer">
        <button className="closeFriends_sendInvite_btn">Send Invitation</button>
      </div>
    </div>
  );
};

export default InviteUsertoEvent;
