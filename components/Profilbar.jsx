'use client'
import React from 'react'
import Image from 'next/image'
import ebbyImage from '@assets/ebby.png'
import { useState } from 'react'


const Profilbar = () => {


  const [navbar, setNavbar] = useState(false)

  const togglemodal = () => {
    setNavbar(!navbar)
  }

  
  return (
    <div>
            <div className="profil-image">
              <div className="profil-content">
                <Image src={ebbyImage} alt="decription of image" className='profilImage' onClick={togglemodal}/>
                {navbar && (
                  <div className="linkpage1">2</div>
                )}
              </div>
               
            </div>
    </div>
  )
}

export default Profilbar
