import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import searchIcon from "@assets/search.png";
import xMarkerIcon from "@assets/Xmarker.png";

interface CloseFriend {
  userId: string;
  userName: string;
  picture: {
    pictureUrl: string;
  };
}

interface EventInviteData {
  friendsDataList: string[];
  eventIdData: any; // Adjust the type according to the actual type of eventIdData
}

interface Props {
  eventIdData: any; // Adjust the type according to the actual type of eventIdData
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const InviteUsertoEvent: React.FC<Props> = ({ eventIdData }) => {
  const [closeFriends, setCloseFriends] = useState<CloseFriend[] | null>(null);
  const [searchToggle, setSearchToggle] = useState(false);
  const [selectfriends, setSelectfriends] = useState<CloseFriend | null>(null);
  const [invitedfriendsList, setInvitedfriendsList] = useState<string[]>([]);
  const [checkInvitationStatus, setCheckInvitationStatus] = useState(false);

  // Fetches the closefriends data from the server
  const { data: currentUserCloseFriends, error } = useSWR<CloseFriend[]>(
    "http://localhost:3000/api/invite",
    fetcher
  );

  // Handle the selection of friends from the currentUser-
  const handleSelectFriends = (event: CloseFriend) => {
    setSelectfriends((prevEvent) =>
      prevEvent === event ? null : event
    );
    setInvitedfriendsList((prevArr) => {
      if (prevArr.includes(event.userId)) {
        return prevArr.filter((id) => id !== event.userId);
      } else {
        return [...prevArr, event.userId];
      }
    });
  };

  // Send the invitation out, list of friends and eventId
  const sendIdData = async (invitedfriendsList: string[], eventIdData: any) => {
    try {
      const eventInviteData: EventInviteData = {
        friendsDataList: invitedfriendsList,
        eventIdData: eventIdData,
      };
      const res = await fetch("http://localhost:3000/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventInviteData),
      });

      if (!res.ok) {
        throw new Error(
          "Failed to send the invitation to friends on InviteFriendsToEventAPI"
        );
      } else {
        const data = await res.json();
        console.log(data.message);
        if (data.message === "friends are successfully invited") {
          handleSuccessfulPopUp();
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
    setSearchToggle(!searchToggle);
  };

  // Handle the friends invitation after clicking on the button
  const handleFriendsInvitation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendIdData(invitedfriendsList, eventIdData);
  };

  // displays a successful invite message
  const handleSuccessfulPopUp = () => {
    setCheckInvitationStatus(true);
  };

  // Rerenders the page, after the successful Invite message with a timer of 500 ms and clears the friendsList
  useEffect(() => {
    if (checkInvitationStatus) {
      const timer = setTimeout(() => {
        setCheckInvitationStatus(false);
        setInvitedfriendsList([]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [checkInvitationStatus]);

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
            {searchToggle && (
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
        {/* Represents a array of friends that can receive an invitation */}
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
                {/* Represents the friends which are marked */}
                {invitedfriendsList.includes(event.userId) && (
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
            <div className="invitationPopup_successfulPopUp_content">
              You Successfully invited your friends
            </div>
          </div>
        )}
      </div>

      {/* Represents the invitation Button */}
      <form onSubmit={handleFriendsInvitation}>
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
