"use client"
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import React, { useEffect, useState } from 'react'
import useSWR, { preload } from 'swr'




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




// const getqueriedUser = async(userIdPicData) => {
//   try{
//     const res = await fetch(`http://localhost:3000/api/search`,{
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({userIdPicData})

//     })
//     if(!res.ok){
//       throw new Error('Invalid res')
//     }
//     const data = await res.json() 
//     console.log(data)
//     return data
   

//   }catch(error){
//     // throw new Error(error, "Fetch Error on requesting User on search")
//     console.log( "Fetch Error getting User on search",error)
  

//   }

// }

const fetcher = (url) => fetch(url).then((res) => res.json())


const SearchInput = () => {

  const [searchValue, setSearchValue] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState([])
  const [userIdPicData, setUserIdPicData] = useState("");



  const {data: userInfoData, error,mutate} = useSWR(
   userIdPicData ? `http://localhost:3000/api/search/${userIdPicData}`: null, fetcher, {
    refreshInterval: 500,
})

  useEffect(() => {
      const fetchuserInfo = async() => {

        const requestUserInfo = await queryUser(searchValue)
        

        setDisplayUserInfo(requestUserInfo)

        if(requestUserInfo.length > 0){
          const userIdReqInfoData = requestUserInfo[0].userId
          setUserIdPicData(userIdPicData)
        }


      
      } 

      const intervalId = setInterval(fetchuserInfo, 5000)
      fetchuserInfo()

      return() => clearInterval(intervalId)
  },[searchValue])


// console.log(displayUserInfo)

const handleChange = async(e) => {
  const value = e.target.value
  setSearchValue(value)

}

const handleSearchReq =  (userId) => {
  
  setUserIdPicData(userId)

}




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
              <div className='testtry1' onChange={() => handleSearchReq(event.userId)}>
              {event.userId}
              </div>
              
            </div>
          </div>
        ))}

        {userInfoData && (
        <div className={searchstyle['AdditionalUserInfo']}>
          {/* Display additional user information here */}
          {/* Example: {userInfoData.name}, {userInfoData.email}, etc. */}
        </div>
        )}
            
        </div>

          
      
    </div>

  )
}

export default SearchInput
