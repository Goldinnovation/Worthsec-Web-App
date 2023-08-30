'use client'
import React from 'react'
import Image from 'next/image'
import userIcon from '@assets/user.png'
import starIcon from '@assets/star.png'
import searchIcon from '@assets/search.png'
import { useState } from 'react'




const Profilbar = () => {

  const [navbar, setNavbar] = useState(false)


  const togglemodal = () => {
    setNavbar(!navbar)
  }

  
  return (
    <>
            <div className="profil-image">
                <div className='profil-content'>
                <Image src={userIcon} alt="decription of image" className='userIcon' />
                <Image src={searchIcon} alt="decription of image" className='userIcon' />
                <Image src={starIcon} alt="decription of image" className='userIcon' onClick={togglemodal}/>
               
             </div>
            </div>

            
            {navbar && (
                  <div className="star-area" onClick={togglemodal}>

                  </div>
                )}

            

           
    </>
  )
}

export default Profilbar
