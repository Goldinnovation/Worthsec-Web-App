
import React from "react"
import Image from "next/image"
import ExploreIcon from "../../assets/exploreIcon.png"
import ProfileIcon from "../../assets/ag1.png"
import ExpandUserOptions  from  "../../assets/menu.png"


interface menuProps {
    handleExploreToggle: () => void
    handProfileToggle: () => void
    handleExpandUserOptions: () => void

}


const UserMenu: React.FC<menuProps> = ({handProfileToggle, handleExploreToggle, handleExpandUserOptions}) => {

    return(
        <div className="flex flex-row  w-full ">
           
           <div className="flex  gap-5 p-2 w-full h-16  items-center">
           <div className="w-2/5 h-10 bg-gray-500 bg-opacity-70 border border-gray-300 rounded-full flex items-center justify-around">
           <div>
            1
           </div>
           <div className="cursor-pointer"
           onClick={handProfileToggle}>
           <Image  src={ProfileIcon} width={30} height={30} alt='Explor Icon'/>
           </div>

           </div>
           <div className="w-1/5 h-20 bg-blue-500 rounded-full">2</div>


           <div className="w-2/5 h-10 bg-gray-500 bg-opacity-70 border border-gray-300 rounded-full  flex items-center justify-around">
           
           <div  className="cursor-pointer" 
           onClick={handleExploreToggle}> 
            <Image  src={ExploreIcon} width={30} height={30} alt='Explor Icon'/>
           </div>

           <div  className="cursor-pointer"
           onClick={handleExpandUserOptions}>
           <Image  src={ExpandUserOptions} width={30} height={30} alt='Explor Icon'/>

           </div>
           </div>

           </div>
               
           
        </div>
    )
}

export default UserMenu