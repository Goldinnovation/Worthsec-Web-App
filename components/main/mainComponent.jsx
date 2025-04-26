"use client"

import React from "react"
import StoryComponent from "./story/storyComponent"
import ExploreComponent from "./explore/exploreComponent"

const MainComponent  = () => {
    return(
        <div style={{
            // backgroundColor: "orange", 
            height:"100%", 
            width:"100%", 
            display:"flex"
        }}>
                 <div style={{
                    // backgroundColor: "pink", 
                    width: "70%", 
                    height:"100%",
                 }}>
                    <ExploreComponent/>
                    
                 </div>
                 <div style={{
                    //   backgroundColor: "grey", 
                      width: "30%", 
                      height:"100%",
                    //   borderLeft: "1px solid grey", 

                 }}>
                    <StoryComponent/>
                 </div>
            
        </div>
    )
}

export default MainComponent 