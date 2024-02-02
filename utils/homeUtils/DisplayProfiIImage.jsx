'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import style from '@styles/usercontentstyle.module.css'
import happyprofilIcon from '@assets/happy.png'
import { getData } from '@components/homeComponents/CalenderContent'
import useSWR, { preload } from 'swr'
import testProfpIC from '@assets/defaultPic2.jpg'









const fetcher = (url) => fetch(url).then((res) => res.json())



  const DisplayProfiIImage = () => {
    const {data: profilImageData,error,mutate} = useSWR('http://localhost:3000/api/user', fetcher, {
      
    })


  


  return (
    <div>
        
        <div className={style["ImageSection"]}>
           
           
           { profilImageData ? (
            <div className={style["ProfilpiContainer"]}>
               
                 <Image 
                 src={`/${profilImageData.pictureUrl}`}
                 className={style["pictureUrl"]}
                 alt='uploaded Image'
                 width={130}
                height={130}
                quality={100}
                priority
                
                />
                
            </div>
           ) : (
            <Image
            src={testProfpIC}
            className={style["happyProfilIcon"]}
            alt='default profil Image'
            // fill
            width={130}
            height={130}
            quality={100} />
           )}
        </div>
      
    </div>
  )
}




export default DisplayProfiIImage
// export const dynamic = 'force-dynamic'
