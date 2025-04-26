import React from "react"

const StoryComponent = () => { 
    return(
        <div style={{
            width: "100%", 
            height: "100%", 
            display: "flex", 
            flexDirection: "column"
        }}>
            <div style={{
                // backgroundColor: "green", 
                height: "40%", 
                width:"100%", 
                display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                padding: "1%"


            }}>
                <div style={{
                    // backgroundColor: "grey",
                    backgroundColor: "rgba(42, 42, 42, 0.3)",

                    height: "100%",
                    width: "100%", 
                    borderRadius: "7px",
                    border: "1px solid grey"
                }}>
                    Map
                </div>
            </div>
            <div style={{
                //  backgroundColor: "orange", 
                
                 height: "60%", 
                 width:"100%",
                 display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                padding: "1%"
            }}
            >
                  <div style={{
                    backgroundColor: "rgba(42, 42, 42, 0.3)",
                    height: "100%",
                    width: "100%", 
                    borderRadius: "7px",
                    border: "1px solid grey"
                }}>
                    Network
                </div>

            </div>

             
        </div>
    )

}

export default StoryComponent