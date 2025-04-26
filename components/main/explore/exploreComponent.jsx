
import React from "react"
// import ExploreContent from "@/components/exploreComponents/explorePageStructure"



const ExploreComponent = () => {
    return(
        <div style={{
            width: "100%", 
            height: "100%",
            
        }}>
            <div style={{
                //  backgroundColor: "green", 
                 backgroundColor: "rgba(42, 42, 42, 0.3)",
                height: "7%", 
                width:"100%", 
                display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                padding: "1%" 
            }}>
                <div style={{
                    // backgroundColor: "grey",
                    height: "100%",
                    width: "100%", 
                    borderRadius: "5px",
                    border: "1px solid grey"
                }}>
                    tag 
                    
                </div>

            </div>

            <div style={{
                //  backgroundColor: "orange", 
                 backgroundColor: "rgba(42, 42, 42, 0.3)",

                 height: "93%", 
                 width:"100%", 
                 display: "flex", 
                 justifyContent: "center",
                 alignItems: "center", 
                 padding: "1%" 

            }}>
                     {/* <ExploreContent/> */}
            </div>
         

        </div>
    )
}
export default ExploreComponent