'use client';
import React, { useState } from 'react';
import styles from '@styles/usercontentstyle.module.css';
import happyprofilIcon from '@assets/happy.png';
import Image from 'next/image';
import { use } from 'passport';
import CameraIcon from '@assets/camera.png';
import EditIcon from '@assets/edit.png';
import GetImageProfilPIC from '@utils/homeUtils/DisplayProfiIImage';
import DeleteBtn from '@utils/homeUtils/DeleteBtnProfImage';
const UploadGif = () => {
    const [profilImagepreview, setProfilImagePreview] = useState(null);
    const [previewArea, setPreviewArea] = useState(false);
    const [editOptions, setEditOptions] = useState(false);
    const [uplaodImage, setUploadImage] = useState({
        userProfileGifBg: ""
    });
    const handletoggle = () => {
        setPreviewArea(!previewArea);
    };
    const toggleShowOptions = () => {
        setEditOptions(!editOptions);
        setPreviewArea(false);
    };
    // Handles the input button click 
    const handleUploadClick = () => {
        document.getElementById('userGifBg').click();
    };
    const handleUplaodImage = (e) => {
        console.log("triggrt");
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilImagePreview(reader.result);
                setUploadImage(profilImagepreview => ({ ...profilImagepreview, userProfileGifBg: file }));
            };
            if (file && file.type.match(/image\/gif/)) {
                reader.readAsDataURL(file);
            }
            else {
                console.error('Invalid file type. Only JPEG and PNG are supported.');
            }
        }
    };
    const handleCloseCLick = () => {
        setProfilImagePreview(null);
        setPreviewArea(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userProfileGifBg', uplaodImage.userProfileGifBg);
        try {
            const res = await fetch('http://localhost:3000/api/uploadUserBackground', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                throw new Error(`res issue ${res.status}`);
            }
            const data = await res.json();
            setProfilImagePreview(null);
            setPreviewArea(false);
        }
        catch (error) {
            console.error('Send Error, Fetch', error);
        }
    };
    return (<div>
        {/* Handles the Form */}
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className={styles["profilPicSection"]}> 
            <input type="file" className="userProfileGifBg" id='userGifBg' onChange={handleUplaodImage} hidden/>
                {/* <GetImageProfilPIC/> */}
            </div>


            
        </form>

           {/* Pop Up  */}
           {previewArea && (<div className={styles["previewSection"]}>
                    <div className={styles["previewSectionUpperlayer"]}>
                    <div onClick={handleCloseCLick} className={styles["previewSectionCloseBtn"]}>x</div>
                    </div>
                    <div className={styles["previewSectionImage"]}>
                    {profilImagepreview && (<div className={styles["previewImageObjectSection"]}>
                            <Image src={profilImagepreview} alt="Uploaded ProfilImage" width={210} height={140} className={styles["previewImageObject"]}/>
                        </div>)}
                    </div>
                    <div className={styles["previewSectionBtn"]}>
                    <button type='button' onClick={handleUploadClick} className={styles["previewBtntryAgain"]}>Upload</button>
                    <button onClick={handleSubmit} className={styles["previewBtnSubmit"]}>Submit</button>
                       
                    </div>
                </div>)} 

              {/* Lable Btn  */}
        <div className={styles["BtnSection"]}>
            <div onClick={toggleShowOptions} className={styles["uploadprofilImageBtn"]}>
                GI       
        </div>
        </div>
            {/* Represents the pop Up */}
        <div className={styles['editoptionPopup']}>
            {editOptions && (<div className={styles['editOptions']}>
                            <div onClick={handletoggle} className={styles['upatebtnProfilPicture']}>update</div>
                            <div className={styles['DeleteProfilPicture']}><DeleteBtn /></div>
                        </div>)}

            </div>
       
    </div>);
};
export default UploadGif;
