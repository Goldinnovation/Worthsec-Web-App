'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import style from '@styles/usercontentstyle.module.css'
import happyprofilIcon from '@assets/happy.png'
import { getData } from '@components/homeComponents/CalenderContent'
import useSWR, { preload } from 'swr'




// export const getImage = async() => {

//     try{

//         const res = await fetch('http://localhost:3000/api/user', {
//             method:'GET',    
           
//         })

//     if(!res.ok){
//         console.log('res Error, ')
//         throw new Error(error)

//     }
//     const data = await res.json()
//     return data

//     }catch(error){

//         console.log('GET Profil-Image Fetch Error',error)
//     }

    

// }





const handleDelete = async(userId) => {
    try{


        const res = await fetch(`http://localhost:3000/api/user/${userId}`,{
            method: 'DELETE',
           

        })

        if(!res.ok){
            throw new Error('DELETE request failed')
        }


    }catch(error){
        console.log('Fetch Fail, Delete', error)
    }


}



const fetcher = (url) => fetch(url).then((res) => res.json())



  const DisplayProfiIImage = () => {
    const {data: profilImageData,error,mutate} = useSWR('http://localhost:3000/api/user', fetcher, {
        refreshInterval: 500,
    })


    
//    const [profilImageData, setProfilImageData] = useState(null)
   
//    const data = await getImage() 
//    setProfilImageData(data)
  



    // useEffect(() => {
    //     const fetchUserProfilPic = async() => {
    //         const data = await getImage()

    //         console.log(data)
    //         setProfilImageData(data)


    //     }

    //     const intervalId = setInterval(fetchUserProfilPic, 5000)
    //     fetchUserProfilPic()

    //     return () => clearInterval(intervalId)
    // }, [])



  return (
    <div>
        
        <div className={style["ImageSection"]}>
           
           
        <div onClick={() => handleDelete(profilImageData.picture_owner_id)} className={style["deleteProfPic"]}>x</div>
           { profilImageData ? (
            <div className={style["ProfilpiContainer"]}>
               
                 <Image 
                 src={`/${profilImageData.pictureUrl}`}
                 className={style["pictureUrl"]}
                 alt='uploaded Image'
                 fill
                quality={100}
                priority
                
                />
                
            </div>
           ) : (
            <Image
            src={happyprofilIcon}
            className={style["happyProfilIcon"]}
            alt='default profil Image'
            width={90}
            height={90} />
           )}
        </div>
      
    </div>
  )
}




export default DisplayProfiIImage
// export const dynamic = 'force-dynamic'
