'use client'
import React, { useState } from 'react'
import styles from '@styles/usercontentstyle.module.css'
import happyprofilIcon from '@assets/happy.png'
import Image from 'next/image'
import { use } from 'passport'
import CameraIcon from '@assets/camera.png'
import EditIcon from '@assets/edit.png'
import GetImageProfilPIC from '@utils/homeUtils/DisplayProfiIImage'
import DeleteBtn from '@utils/homeUtils/DeleteBtnProfImage'








const ProfilImageBtn = () => {

    const [profilImagepreview, setProfilImagePreview] = useState(null)
    const [previewArea, setPreviewArea] = useState(false)
    const [editOptions, setEditOptions] = useState(false)
    const [uplaodImage, setUploadImage] = useState({
        UserProfilImage:""
    })

    




    const handleUploadClick = () => {

        document.getElementById('uplaodProfilImageInput').click()
    }


    const handletoggle = () => {
        setPreviewArea(!previewArea)

    }

    const toggleShowOptions = () => {
        setEditOptions(!editOptions)
        setPreviewArea(false)
    }
    


    const handleUplaodImage = (e) => {
        
        const file = e.target.files[0]
        

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilImagePreview(reader.result);
                setUploadImage(profilImagepreview =>({...profilImagepreview, UserProfilImage: file}))
            }

            if (file && (file.type.match(/image\/jpeg/) || file.type.match(/image\/png/))){
                reader.readAsDataURL(file);
            }
            else {
                console.error('Invalid file type. Only JPEG and PNG are supported.');
              }
        }


    }

    const handleCloseCLick = () => { 
        setProfilImagePreview(null)
        setPreviewArea(false)
    }

    const handleSubmit  = async(e) => {
        e.preventDefault();

        const formData = new FormData(); 
        formData.append('UserProfilImage', uplaodImage.UserProfilImage)


        try{
            const res = await fetch('http://localhost:3000/api/user',{
                method:'POST', 
                body: formData

            })
            if(!res.ok){
                throw new Error(`res issue ${res.status}`)
            }

            const data = await res.json(); 
           
            setProfilImagePreview(null)
            setPreviewArea(false)

          
           

        }catch(error){
            console.error('Send Error, Fetch', error)

        }

       

    }


  return (
    <div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className={styles["profilPicSection"]}> 
            <input type="file" className="UserProfilImage" id='uplaodProfilImageInput'  onChange={handleUplaodImage} hidden/>
                {/* <GetImageProfilPIC/> */}
            </div>

            {previewArea &&(
                <div className={styles["previewSection"]}>
                    <div className={styles["previewSectionUpperlayer"]} >
                    <div onClick={handleCloseCLick} className={styles["previewSectionCloseBtn"]}>x</div>
                    </div>
                    <div className={styles["previewSectionImage"]}>
                    {profilImagepreview && (
                        <div className={styles["previewImageObjectSection"]}>
                            <Image src={profilImagepreview} alt="Uploaded ProfilImage" width={140} height={140} className={styles["previewImageObject"]}/>
                        </div>
                    )}
                    </div>
                    <div className={styles["previewSectionBtn"]}>
                    <button  type='button' onClick={handleUploadClick} className={styles["previewBtntryAgain"]}>Upload</button>
                    <button  onClick={handleSubmit} className={styles["previewBtnSubmit"]} >Submit</button>
                       
                    </div>
                </div>
            )}

            <div className={styles["BtnSection"]}>
            <div  onClick={toggleShowOptions} className={styles["uploadprofilImageBtn"]}>SE          
            </div>
            </div>
           
           
        
       


        </form>

        <div className={styles['editoptionPopup']}>
            {editOptions &&(
                        <div className={styles['editOptions']}>
                            <div onClick={handletoggle} className={styles['upatebtnProfilPicture']} >update</div>
                            <div className={styles['DeleteProfilPicture']}><DeleteBtn/></div>
                        </div>
                    )}

            </div>
       
    </div>
  )
}

export default ProfilImageBtn
