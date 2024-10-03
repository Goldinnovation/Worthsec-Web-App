'use client'
import React, { useEffect, useState } from "react";
import styles from "@styles/exploreStyle/explore.module.css";
import Image from "next/image";
import ExploreFeed from "./Feed/Explore_feed";
// import "tailwindcss/tailwind.css"



interface Event {
  eventId: string;
  
}

export const getallEventsWorldwide = async (selectedValues: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/explore`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.log("Error on response: GetallEventsWorldWide");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("GetallEventsWorldWide:", error);
    // throw Error('Request Error on Fetch: GetallEventsWorldWide')
  }
};



const ExploreContent: React.FC = () => {
  const [userexploreData, setuserExploreData] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState({
    explore_selectTypeofEvent__bmewZ: "3",
    selectedRangeofEvents: "",
    explore_selectTypeofEventCategory__KzDeU: "3",
  });





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
console.log(userexploreData);

  return (
    <div>
      <section className={styles["middleSection"]}>

        {/* Head Section */}
        <div className={styles["middleContentarea"]}>
          

          <div className={styles["middleContentbar_left"]}></div>


          <div className={styles["middleContentbar"]}>
            <div className={styles["EventStateArea"]}>
              <div  className={styles["EventStateLable"]}>
                Underground 
              </div>
             
            </div>
            <div>
            </div>
         
          </div>
          <div className={styles["middleContentbar_right"]}></div>



        </div>

      {/*  subHeader Section*/}
        <div className={styles["exploreheader"]}>

        </div>
       

        {/* Feed Section */}
        <div className={styles["middleContentFeed"]}>

          {/* Left Feed Section  */}
          <div className={styles["exploreEventContent"]}>
            <div className={styles["exploreEventhead"]}>
              <div className={styles["exploreEventheadMoodOpt"]}>Mood</div>
              <div  className={styles["exploreEventheadSharedOpt"]}>Shared</div>
            </div>
            <div>
                dsd
            </div>
          </div>

         {/* Right Feed Section  */}
          <div className={styles["exploreEventContentRight"]}>
           
            <div className={styles["explorefeedContent"]}>
              <div className={styles["explorefeedEventsHead"]}>
                <div className={styles["explorefeedEventsHeadTitle"]}>
                 Category
                </div>
              </div>
              {/* Explore Feed */}
                <ExploreFeed eventDataArr ={userexploreData} />
           
            </div>
          </div>


        </div>
      </section>
    </div>
  );
};

export default ExploreContent;
