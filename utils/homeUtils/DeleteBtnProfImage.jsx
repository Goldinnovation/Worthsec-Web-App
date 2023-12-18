import React from 'react'
import style from '@styles/usercontentstyle.module.css'
import useSWR, { preload } from 'swr'





export const handleDelete = async(userId) => {
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


const DeleteBtnProfImage = () => {

    const {data: profilImageData,error,mutate} = useSWR('http://localhost:3000/api/user', fetcher, {
        refreshInterval: 500,
    })

  return (
    <div>
        <div className={style['DeleteProfPictureSection']}>
        <div onClick={() => handleDelete(profilImageData.picture_owner_id)} className={style["deleteProfPic"]}>Delete</div>


        </div>
      
    </div>
  )
}

export default DeleteBtnProfImage
