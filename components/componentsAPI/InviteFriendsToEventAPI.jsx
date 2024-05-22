import React, { useEffect, useState } from 'react'




const InviteFriendsToEventAPI = ({postData, successfulInvitation}) =>  {

  const [sendInvitationPopup, setSendinvitationPopUp] = useState(false)


// console.log(postData);
useEffect(() => {
  const sendIdData = async(postData) => {
    try{
      const res =  await fetch("http://localhost:3000/api/invite", {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

     
      if(!res.ok){
        throw new Error('Failes to send the inviation to friends on InviteFriendsToEventAPI ')

    } else{
      const data = await res.json()
      if(data.message === "successful connected"){
        setSendinvitationPopUp(true)
        successfulInvitation();
        console.log(data);

       

      }
          
    }
  }catch(error){
      console.error(
        'Error sending the invitation', error
      )
    }
  }


  sendIdData(postData)

}, [postData])
    



  return (
   <>

   {sendInvitationPopup && (
    <div>sddsd</div>
   )}

   </>
  )
}

export default InviteFriendsToEventAPI
