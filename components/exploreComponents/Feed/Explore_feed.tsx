import styles from "@styles/exploreStyle/explore.module.css";
import Image from "next/image";
import { useState } from "react";
// import { userFavorEvent } from "@/Service/Explore/userFavorEvent";
import { userFavorEvent } from "@/Service/Explore/userFavorEvent";
import { userJoinEvent } from "@/Service/Explore/userJoinedEvents";
import ExploreSlider from "../PopUp/exploreSilder";
import ExplorePopUpOption from "../PopUp/explorePopUpOption";
import React from "react";
import { useMemo } from "react";
interface userEvent {
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

interface ExploreFeedprops {
  eventDataArr: userEvent[];
}

interface Event {
  eventId: string;
}



const ExploreFeed: React.FC<ExploreFeedprops> = ({ eventDataArr }) => {
  const [popupSelectedItem, setpopupSelectedItem] = useState(null);

  const handleToggleitem = (event: any) => {
    // console.log(event);
    setpopupSelectedItem(popupSelectedItem === event ? null : event);
  };

  const handleUserFavoredEvent = async (e: string) => {
    const FavoredEventReq = await userFavorEvent(e);
  };

  const handleuserJoinedEvent = async (e: string) => {
    const JoinedEventReq = await userJoinEvent(e);
  };

  return (
    <div className={styles["explorefeedEvents"]}>
      {eventDataArr?.map((event:userEvent, i: number) => (
        <div key={i} className={styles["exploreContentSection"]}>
          <div
            className={styles["exploreContent"]}
            onClick={() => handleToggleitem(event)}
          >
            <Image
              src={event?.ImageCoverUpload}
              width={150}
              alt="Event cover"
              height={50}
              className="rounded-xl h-36
"
              quality={100}
            />
          </div>
          <div className={styles["exploreEventTitleContent"]}>
            <div className={styles["exploreEventTitle"]}>
              {event.eventTitle}
            </div>
          </div>

          <div className={styles["exploreContentPopupSection"]}>
            {popupSelectedItem &&
              (popupSelectedItem as Event)?.eventId === event.eventId && (
                <div className={styles["exploreContentPopupOverlay"]}>
                  <ExplorePopUpOption
                    eventData={popupSelectedItem}
                    handleToggleitem={handleToggleitem}
                    handleuserJoinedEvent={handleuserJoinedEvent}
                    handleUserFavoredEvent={handleUserFavoredEvent}
                  />

                  <div className={styles["explorePopUppreview"]}>
                    <ExploreSlider
                      eventArr={eventDataArr}
                      handleToggleitem={handleToggleitem}
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreFeed;
