import React, { useEffect, useState } from "react";
import styles from "@styles/exploreStyle/explore.module.css";
import Image from "next/image";

export const getallEventsWorldwide = async (selectedValues) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/explore?selectedValues=${selectedValues}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      Console.log("Error on response: GetallEventsWorldWide");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetallEventsWorldWide:", error);
    // throw Error('Request Error on Fetch: GetallEventsWorldWide')
  }
};

//  User can favor event
const userFavorEvent = async (favoreventId) => {
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

const userJoinEvent = async (joinEventId) => {
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

const ExploreContent = () => {
  const [rangeValue, setrangeValue] = useState(9);
  const [userexploreData, setuserExploreData] = useState([]);
  const [popupSelectedItem, setpopupSelectedItem] = useState(null);
  const [favoreventId, setFavoreventId] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState({
    explore_selectTypeofEvent__bmewZ: "3",
    selectedRangeofEvents: "",
    explore_selectTypeofEventCategory__KzDeU: "3",
  });

  const handleInput = (e) => {
    if (e.target.className === "selectedRangeofEvents" && e.target.value) {
      setrangeValue(e.target.value);
    }

    setSelectedQuery({
      ...selectedQuery,
      [e.target.className]: e.target.value,
    });
  };

  const handleToggleitem = (event) => {
    setpopupSelectedItem(popupSelectedItem === event ? null : event);
  };

  useEffect(() => {
    const fetchexploreData = async () => {
      try {
        const encodeData = encodeURI(JSON.stringify(selectedQuery));
        const exploreData = await getallEventsWorldwide(encodeData);
        setuserExploreData(exploreData);
      } catch (error) {
        console.log("Error fetching explore data:", error);
      }
    };

    // Sets up the interval for the period of the fetch
    const invervalId = setInterval(fetchexploreData, 52000);

    fetchexploreData();

    return () => clearInterval(invervalId);

    // Renders the page from everytime the selectedValue is enterd
  }, [selectedQuery]);

  return (
    <div>
      <section className={styles["middleSection"]}>
        <div className={styles["middleContentarea"]}>
          <div className={styles["middleContentbar_left"]}></div>
          <div className={styles["middleContentbar"]}>
            <div className={styles["selectContentTypeofEventbar"]}>
              <select
                className={styles["selectTypeofEvent"]}
                onChange={handleInput}
                required
              >
                <option value="" className={styles["event-type-content"]}>
                  Event-type
                </option>
                <option value="1">Exhibiton</option>
                <option value={2}>House party</option>
                <option value={3}>Club Party</option>
              </select>
            </div>
            <div>
              <input
                type="range"
                id="rangeInput"
                className="selectedRangeofEvents"
                onChange={handleInput}
                min="9"
                max="20"
                value={rangeValue}
              />
              <output htmlFor="rangeInput" id="outputValue">
                {rangeValue}
              </output>
            </div>
            <div className={styles["selectContentCategorybar"]}>
              <select
                className={styles["selectTypeofEventCategory"]}
                onChange={handleInput}
                required
              >
                <option value="" className={styles["event-Category-content"]}>
                  Event Category
                </option>
                <option value="1">only friends</option>
                <option value={2}>friends++</option>
                <option value={3}>WorldWide</option>
              </select>
            </div>
            {/* <div>
                    <button className="startselectSearch" onClick={() => getallEventsWorldwide(selectedValues)}>Start</button>
                  </div> */}
          </div>
          <div className={styles["middleContentbar_right"]}></div>
        </div>
        <div className={styles["exploreheader"]}>trtr</div>
        <div className={styles["middleContentFeed"]}>
          <div className={styles["exploreEventContent"]}>
            <div className={styles["exploreEventItem"]}>wew</div>
          </div>
          <div className={styles["exploreEventContentRight"]}>
            <div className={styles['exploreEventCategorySection']} >
                  dsds
                </div>
            <div className={styles["explorefeedContent"]}>
              <div className={styles["explorefeedEventsHead"]}>
                <div className={styles["explorefeedEventsHeadTitle"]}>
                  dsdsd
                </div>
              </div>
              <div className={styles["explorefeedEvents"]}>
                {userexploreData.map((event, i) => (
                  <div key={i} className={styles["exploreContentSection"]}>
                    <div
                      className={styles["exploreContent"]}
                      onClick={() => handleToggleitem(event)}
                    >
                      <Image
                        src={event.ImageCoverUpload}
                        width={200}
                        alt="Event cover"
                        height={200}
                        quality={100}
                      />
                    </div>

                    <div className={styles["exploreContentPopupSection"]}>
                      {popupSelectedItem &&
                        popupSelectedItem.eventId === event.eventId && (
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
                                      width={400}
                                      height={400}
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
                                {userexploreData.map((event, i) => (
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreContent;
