import styles from "@styles/exploreStyle/explore.module.css";
import Image from "next/image";
const ExplorePopUpOption = ({ eventData, handleToggleitem, handleuserJoinedEvent, handleUserFavoredEvent }) => {
    return (<div>
             <div className={styles["exploreContentPopupArea"]}>
                              <div className={styles["explorePopUpselectedTitleSection"]}>
                                <h1 className={styles["explorePopUpselectedTitle"]}>
                                  {eventData.eventTitle}
                                </h1>
                                <div className={styles["explorePopUpselectedClose"]} onClick={() => handleToggleitem(null)}></div>
                              </div>
                              <div className={styles["explorePopUpselectedContentSection"]}>
                                <div className={styles["explorePopUpselectedContent"]}>
                                  <div className={styles["explorePopUpselectedCover"]}>
                                    <Image src={eventData.ImageCoverUpload} alt="current user event cover" className={styles["explorePopUpCoverItem"]} width={650} height={540} quality={100}/>
                                  </div>
                                  <div className={styles["explorePopUpselectedDescript"]}>
                                    {eventData.eventId}
                                  </div>
                                </div>
                                <div className={styles["explorePopUpselectedbar"]}>
                                  dsndjn
                                </div>
                              </div>
                              <div className={styles["explorePopUpselectedOptions"]}>
                                <button className={styles["explorePopUpselectedOptionbtn1"]} onClick={() => handleuserJoinedEvent(eventData.eventId)}>
                                  Join
                                </button>

                                <button className={styles["explorePopUpselectedOptionbtn2"]} onClick={() => handleUserFavoredEvent(eventData.eventId)}>
                                  Favor
                                </button>

                                <button className={styles["explorePopUpselectedOptionbtn3"]}>
                                  Share
                                </button>
                              </div>
                              </div>
        
        </div>);
};
export default ExplorePopUpOption;
