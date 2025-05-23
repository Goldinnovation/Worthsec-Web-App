import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import searchIcon from "@assets/search.png";
import xMarkerIcon from "@assets/Xmarker.png";

const fetcher = (url) => fetch(url).then((res) => res.json());




const InviteUsertoEvent = ({eventIdData}) => {
  const [closeFriends, setCloseFriends] = useState(null);
  const [searchToggel, setSearchToggle] = useState(false);
  const [selectfriends, setSelectfriends] = useState(null);
  const [invitedfriendsList, setinvitedfriendsList] = useState([]);
  const [checkInvitationStatus, setCheckInvitationStatus] = useState(false);
 

  // Fetches the closefriends data from the server
  const { data: currentUserCloseFriends, error } = useSWR(
    "http://localhost:3000/api/invite",
    fetcher
  );

  // Handle the selection of friends from the currentUser-
  const handleSelectFriends = (event) => {
    setSelectfriends(selectfriends === event ? null : event);
    setinvitedfriendsList((prevArr) => {
      if (prevArr.includes(event.userId)) {
        return prevArr.filter((id) => id !== event.userId);
      } else {
        return [...prevArr, event.userId];
      }
    });
  };

  // Send the invitation out, list of friends and eventId 
  const sendIdData = async (invitedfriendsList, eventIdData) => {
    try {
      const eventInviteData = {
        friendsDataList: invitedfriendsList,
        eventIdData: eventIdData,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventInviteData),
      });

      if (!res.ok) {
        throw new Error(
          "Failes to send the inviation to friends on InviteFriendsToEventAPI "
        );
      } else {
        const data = await res.json();
        console.log(data.message);
        if (data.message === "friends are successfully invited") {
         
          handlesuccessfulPopUp();
        } else {
          console.warn("Unexpected response:", data);
        }
      }
    } catch (error) {
      console.error("Error sending the invitation", error);
    }
  };



//  Search Pop up, currentUser can search for friends 
  const handleSearchPopUp = () => {
    setSearchToggle(!searchToggel);
  };
  
  // Handle the friends invitation after clickung on the button
  const handlefriendsInvitation = (e) => {
    
    e.preventDefault();
    sendIdData(invitedfriendsList, eventIdData)
    
  };

  // displays a successful invite message
  const handlesuccessfulPopUp = () => {
    setCheckInvitationStatus(true)

  }

  // Rerenders the page, after the successful Invite message with a timer of 500 ms and clears the friendsList
  useEffect(() => {
    if(checkInvitationStatus){
    const timer = setTimeout(() => {
      setCheckInvitationStatus(false)
      setinvitedfriendsList([])
      
    }, 500)
    return () => clearTimeout(timer)
    }


  },[checkInvitationStatus])
  


 
  return (
    <div className="invitelayer">
      <div>
        {/* Represents a search button, to search for a closefriend */}
        <div className="userInviteSearch">
          <div className="search_closeFriends_PopUpIcon">
            <Image
              src={searchIcon}
              height={20}
              width={20}
              onClick={handleSearchPopUp}
              alt="search Icon"
            />
            
          </div>
          <div className="seach_closeFirends_input">
            {searchToggel && (
              <div className="userInviteSearchArea">
                <input
                  type="text"
                  className="userInviteInput"
                  placeholder="  Search for friends"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Display the closefriends section where the user can select the friends that should be invited to the event */}
      <div className="closefriends_Section">
        {/* Represents a array of friends that cna receive an invitation */}
        {currentUserCloseFriends?.map((event, i) => (
          <div key={i} className="closeFriendsInviteSection">
            <div
              className="closefriends_Item"
              onClick={() => handleSelectFriends(event)}
            >
              <div className="closefriends_Content">
                <Image
                  src={`/${event.picture.pictureUrl}`}
                  className="inviteCloseFriends_ProfilImg"
                  width={55}
                  height={55}
                  alt="inviteCloseFriends_ProfilImg"
                  priority={true}
                />
                {/* Represents the friends which are marked  */}
                {invitedfriendsList.includes(event.userId) &&  (
                  <div className="closefriends_markItem">
                    <Image
                      src={xMarkerIcon}
                      height={35}
                      width={35}
                      alt="marker Icon"
                    />
                  </div>
                )}

               
                <div className="closefriends_title">{event.userName}</div>
              </div>
            </div>
          </div>
        ))}

        {/* represents the successful Invitation Pop Up Text */}
         {checkInvitationStatus && (
            <div className="invitationPopup_successfulPopUp">
              <div className="invitationPopup_successfulPopUp_content">You Successful invited your friends</div>
            </div>
          )}

        
      </div>

        {/* Represents the invitation Button */}
      <form onSubmit={handlefriendsInvitation}>
        <div className="send_btn_layer">
          <button type="submit" className="closeFriends_sendInvite_btn">
            Send Invitation
          </button>
        
         
         
        </div>
      </form>
      
     
    </div>
  );
};

export default InviteUsertoEvent;
