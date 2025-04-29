"use client"
import React, { useEffect } from 'react'
import Usercontent from '@components/Usercontent'
import Signup from '@components/signUpComponents/Signup'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Page() {

  const [pageState, setPageState] = useState(false)
  const params = useParams()
  const {username}  = params
  const router = useRouter()
  const [userState, setUserState] = useState(false)

 
    const handleCheckForUser = async () => {
      try {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/c/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Error fetching user:");
          return;
        }

        const data = await res.json();

        if(data.message === "User Authenticated"){
          setPageState(true)
          setUserState(true)

        }else if(data.message == "Invalid User Request"){
          const activeUser = data.activeUser
          await router.push(`/user/${activeUser}`);

        }else {
          await router.push(`/`);
        }

      } catch (error) {
        console.error("Error in handleCheckForUser:", error);
      }
    };

    useEffect(() => {
    
    if (pageState == false) {
      handleCheckForUser();
    }
  }, [pageState]);

  return (

    <div>
      {
        pageState && userState &&  (
          <div>
           
              <Usercontent/>
          </div>
        )
      }
    </div>
  )
  
  
}

