
import React from 'react'
import Image from 'next/image'
// import MailIcon from '@assets/Mail3d.png'
import MailIcon from '../../assets/Mail3d.png'
import Settingsbtn from '@/utils/Settingsbtn'


interface ContentProps{
    handleExploreToggle: () => void
    handProfileToggle: () => void
}

const  LeftnavBarContent: React.FC<ContentProps> = ({handleExploreToggle, handProfileToggle}) =>  {

  return (
    <div className=' h-[70%] w-[80%]] flex flex-col items-center'>
        <div className='w-[80%]  h-[90%] grid grid-cols-1 grid-rows-[repeat(3,100px)] '> 
        <div className=' flex flex-col items-center justify-center gap-1'> 
            <div  
            // onClick={handleExploreToggle}
            >
            <Image  src={MailIcon} width={30} height={30} alt='Explor Icon'/>

            </div>

            <div className='text-white text-xs'>
                Profile
            </div>
        </div>
        <div className=' flex flex-col items-center justify-center gap-1'> 
        <div 
        // onClick={handProfileToggle}
        >
            <Image  src={MailIcon} width={30} height={30} alt='Explor Icon'/>

            </div>
            <div className='text-white text-xs'>
                Message
            </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'> 

        <div>
            <Image  src={MailIcon} width={30} height={30} alt='Explor Icon'/>
            </div>
            <div className='text-white text-xs'>
                Notes
            </div>
        </div>

        </div>

       
      
    </div>
  )
}

export default LeftnavBarContent
