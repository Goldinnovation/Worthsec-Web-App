'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import uploadCoverImg from '@assets/UploadCover.png';
const Uploadcover = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageClick = () => {
        document.getElementById('UploadtriggerId').click();
    };
    const handleUplaodImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            if (file && (file.type.match(/image\/jpeg/) || file.type.match(/image\/png/))) {
                reader.readAsDataURL(file);
            }
        }
    };
    const handleSubmit = () => {
    };
    return (<div>
        <form onSubmit={handleSubmit}>
           <div className='UploadCoverArea'>
           <input type="file" className="ImageCoverUpload" id="UploadtriggerId" onChange={handleUplaodImage} hidden/>
           {imagePreview ? (<Image src={imagePreview} alt="Uploaded Preview" width={250} height={250} onClick={() => document.getElementById("UploadtriggerId").click()} style={{ cursor: 'pointer' }}/>) : (<Image src={uploadCoverImg} className='ImageCoverIcon' alt='default Upload ImageIcon' width={100} height={100} onClick={() => document.getElementById("UploadtriggerId").click()} style={{ cursor: 'pointer' }}/>)}
            
           </div>
           
            
        </form>
      
    </div>);
};
export default Uploadcover;
