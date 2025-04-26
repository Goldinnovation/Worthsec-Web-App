'use client'
import React, { useEffect, useState } from "react";
import styles from "@styles/exploreStyle/explore.module.css";
import ExploreFeed from "./Feed/Explore_feed";
import { useMemo } from "react";

interface Event {
  eventId: string;
  
}

export const getallEventsWorldwide = async (selectedValues: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/explore`,
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
        console.log('exploreData', exploreData);
       
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

const memoizedUserExploreData = useMemo(() => userexploreData, [userexploreData]);
  return (
    <div style={{
      border: "1px solid grey", 
      width: "100%", 
      height: "100%"



    }}>
   
         hey
        
        <div className={styles["explorefeedContent"]}>
             
              {/* Explore Feed */}
                {/* <ExploreFeed eventDataArr ={memoizedUserExploreData} /> */}
           
            </div>


    </div>
  );
};

export default ExploreContent;
