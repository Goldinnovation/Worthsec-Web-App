import styles from "@styles/exploreStyle/explore.module.css";
import Image from "next/image";
import { useState } from "react";



interface userEvent{
    ImageCoverUpload: string;
    eventDate: string;
    eventDescriptionContent: string;
    eventHost: string;
    eventId: string;
    eventInviteType: number;
    eventTime: string;
    eventTitle: string;
    eventType: number;

}

interface ExploreFeedprops{
    userexploreData: userEvent[];
}

interface Event {
    eventId: string;
    
  }





//  User can favor event
const userFavorEvent = async (favoreventId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/favorEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favoreventId }),
      });
      if (!res.ok) {
        console.log("response Error on userFavorEvent");
      }
  
      const data = await res.json();
    } catch (error) {
      console.log("userFavorEvent request failed, fetch Error:", error);
    }
  };
  
  // user can join event#
  
  const userJoinEvent = async (joinEventId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/JoinEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ joinEventId }),
      });
      if (!res.ok) {
        console.log("Response Error: UserJoinEvent fetch");
      }
      const data = await res.json();
    } catch (error) {
      console.log("Request Error: userJoinEvent Fetch, unexpected Error:", error);
    }
  };


const ExploreFeed: React.FC<ExploreFeedprops> = ({userexploreData}) => {
    const [popupSelectedItem, setpopupSelectedItem] = useState(null);


    
  const handleToggleitem = (event: any) => {
    setpopupSelectedItem(popupSelectedItem === event ? null : event);
  };



    return(
        <div className={styles["explorefeedEvents"]}>
             {userexploreData?.map((event: any, i) => (
                  <div key={i} className={styles["exploreContentSection"]}>
                    <div
                      className={styles["exploreContent"]}
                      onClick={() => handleToggleitem(event)}
                    >
                      <Image
                        src={event?.ImageCoverUpload}
                        width={200}
                        alt="Event cover"
                        height={200}
                        quality={100}
                      />
                    </div>
                    <div  className={styles["exploreEventTitleContent"]}>
                      <div className={styles["exploreEventTitle"]}>
                      {event.eventTitle}
                      </div>
                    </div>

                    <div className={styles["exploreContentPopupSection"]}>
                      {popupSelectedItem &&
                        (popupSelectedItem as Event)?.eventId === event.eventId && (
                          <div className={styles["exploreContentPopupOverlay"]}>
                            <div className={styles["exploreContentPopupArea"]}>
                              <div
                                className={
                                  styles["explorePopUpselectedTitleSection"]
                                }
                              >
                                <h1
                                  className={
                                    styles["explorePopUpselectedTitle"]
                                  }
                                >
                                  {event.eventTitle}
                                </h1>
                                <div
                                  className={
                                    styles["explorePopUpselectedClose"]
                                  }
                                  onClick={() => handleToggleitem(null)}
                                ></div>
                              </div>
                              <div
                                className={
                                  styles["explorePopUpselectedContentSection"]
                                }
                              >
                                <div
                                  className={
                                    styles["explorePopUpselectedContent"]
                                  }
                                >
                                  <div
                                    className={
                                      styles["explorePopUpselectedCover"]
                                    }
                                  >
                                    <Image
                                      src={event.ImageCoverUpload}
                                      alt="current user event cover"
                                      className={
                                        styles["explorePopUpCoverItem"]
                                      }
                                      width={650}
                                      height={540}
                                      quality={100}
                                    />
                                  </div>
                                  <div
                                    className={
                                      styles["explorePopUpselectedDescript"]
                                    }
                                  >
                                    {event.eventId}
                                  </div>
                                </div>
                                <div
                                  className={styles["explorePopUpselectedbar"]}
                                >
                                  dsndjn
                                </div>
                              </div>
                              <div
                                className={
                                  styles["explorePopUpselectedOptions"]
                                }
                              >
                                <button
                                  className={
                                    styles["explorePopUpselectedOptionbtn1"]
                                  }
                                  onClick={() => userJoinEvent(event.eventId)}
                                >
                                  Join
                                </button>

                                <button
                                  className={
                                    styles["explorePopUpselectedOptionbtn2"]
                                  }
                                  onClick={() => userFavorEvent(event.eventId)}
                                >
                                  Favor
                                </button>

                                <button
                                  className={
                                    styles["explorePopUpselectedOptionbtn3"]
                                  }
                                >
                                  Share
                                </button>
                              </div>
                            </div>

                            <div className={styles["explorePopUppreview"]}>
                              <div
                                className={styles["explorePopUpmovebar"]}
                              ></div>

                              <div className={styles["explorePopUpOption"]}>
                                {userexploreData.map((event: any, i) => (
                                  <div
                                    key={i}
                                    className={
                                      styles["explorePopuppreviewSection"]
                                    }
                                  >
                                    <div
                                      className={
                                        styles["explorepreviewContent"]
                                      }
                                      onClick={() => handleToggleitem(event)}
                                    >
                                      <Image
                                        src={event.ImageCoverUpload}
                                        width={90}
                                        height={90}
                                        alt=" explore - event preview cover"
                                        quality={100}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                ))}

        </div>
    )
}

export default ExploreFeed