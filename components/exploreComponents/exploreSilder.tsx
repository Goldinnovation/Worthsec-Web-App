import styles from "@styles/exploreStyle/explore.module.css";
import Image from "next/image";

interface eventProps{
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


interface eventArrProps {
    eventArr:  eventProps[]
    handleToggleitem: (e: eventArrProps) => void
}





const ExploreSlider: React.FC<eventArrProps> = ({eventArr, handleToggleitem}) => { 

        return(
            <div>
                <div className={styles["explorePopUpOption"]}>
                                {eventArr.map((event: any, i) => (
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
        )
}

export default ExploreSlider