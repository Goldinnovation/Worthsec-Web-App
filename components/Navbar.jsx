'use client'
import React from 'react'
import Image from 'next/image'
import switchIcon from '@assets/switch.png'
import starIcon from '@assets/star.png'
import searchIcon from '@assets/search.png'
import { useState } from 'react'
import SearchBar from './SearchBar'






const Navbar = () => {

  const [starbar, setStarbar] = useState(false)
  const [searchbar, setSearchBar] = useState(false)



  const togglemodal = () => {
    setStarbar(!starbar)
  }

  

  const togglemodal1 = () => {
    setSearchBar(!searchbar)
  }
  return (
    <>
            <div className="profil-image">
                <div className='profil-content'>
                <Image src={switchIcon} alt="decription of image" className='userIcon' />
                <Image src={searchIcon} alt="decription of image" className='userIcon' onClick={togglemodal1} />
                <Image src={starIcon} alt="decription of image" className='userIcon' onClick={togglemodal}/>
               
             </div>
            </div>

            
            {starbar && (
                  <div className="star-area" onClick={togglemodal}>
                      <div className="star-content">hallo</div>
                  </div>
                )}

              {searchbar && (
                <div className="search-popup">
                     <div className="top-container2">
                        <SearchBar/>
                     </div>
                </div>
              )}

            

           
    </>
  )
}

export default Navbar
