"use client"
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import React, { useEffect, useState } from 'react'
import useSWR, { preload } from 'swr'
import Image from 'next/image'




const queryUser  = async(searchValue) => {
  try{
    const res = await fetch(`http://localhost:3000/api/search`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({searchValue})

  })
  if(!res.ok){
    throw new Error('Invalid res')
  }
  const data = await res.json() 
  return data

  }catch(error){
    console.log('Fail to send information ');
    
  }
 
}




const getqueriedUser = async(userIdPicData) => {
  try{
    const res = await fetch(`http://localhost:3000/api/search/${userIdPicData}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
     

    })
    if(!res.ok){
      throw new Error('Invalid res')
    }
    const data = await res.json() 
    console.log(data)
    return data
   

  }catch(error){
    // throw new Error(error, "Fetch Error on requesting User on search")
    console.log( "Fetch Error getting User on search",error)
    throw error;
  

  }

}



const SearchInput = () => {

  const [searchValue, setSearchValue] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState([])
  const [userIdPicData, setUserIdPicData] = useState("");
  const [displayUserPic, setdisplayUserPic] = useState(null)

  const handleChange = async(e) => {
    const value = e.target.value
    setSearchValue(value)
  
  }
  
  const handleSearchReq =  (userId) => {
    
    setUserIdPicData(userId)
  
  }
  

  useEffect(() => {
      const fetchUserPic = async() => {

        if(userIdPicData !== ""){
          try{

            const userPicData =  await getqueriedUser(userIdPicData)
            setdisplayUserPic(userPicData)

          }catch(error){
              console.error("error fetching ther user pic", error)
          }
        }
     
        
      }
      const fetchUserInfo = async () => {
  
        const requestUserInfo = await queryUser(searchValue)
        setDisplayUserInfo(requestUserInfo)
    
       
        if (requestUserInfo.length > 0) {
          setUserIdPicData(requestUserInfo[0].userId)
        }
      }
    
      const intervalId = setInterval(() => {
        fetchUserPic()
        fetchUserInfo()
      }, 5000)
    
      // Initial fetch
      fetchUserPic()
      fetchUserInfo()


      return () => clearInterval(intervalId)
     
  }, [searchValue])



  // useEffect(() => {
  //     const fetchuserInfo = async() => {

  //       const requestUserInfo = await queryUser(searchValue)
        

  //       setDisplayUserInfo(requestUserInfo)
  //       if (requestUserInfo.length > 0) {
  //         setUserIdPicData(requestUserInfo[0].userId)
  //       }
      

  
  //     } 

  //     const intervalId = setInterval(fetchuserInfo, 5000)
  //     fetchuserInfo()

  //     return() => clearInterval(intervalId)
  // },[searchValue])







  return (
    <div>

        <div className={searchstyle['searchContent']}>
        <input type="text" className={searchstyle['searchInput']}  
        onChange={handleChange}
        />
        {/* <button className={searchstyle['searchBtn']} >Search</button> */}
        </div>
       

        <div className={searchstyle['DisplayUserSection']}>
        {displayUserInfo.map((event,i) => (
          <div>
            <div key={i}>
              <div className='testtry1'>
              {event.userId}
              </div>

              
          {/* {displayUserPic && (
            <div>
              <div>{displayUserPic.pictureUrl}</div>
            </div>
          )} */}

               {/* {displayUserPic.map((eventPic, i) => (
                  <div key={i}> 
                  <div>
                    {eventPic.pictureUrl}
                  </div>

                  </div>
               ))} */}
              
            </div>
          </div>
        ))}

    
            
        </div>

          
      
    </div>

  )
}

export default SearchInput
