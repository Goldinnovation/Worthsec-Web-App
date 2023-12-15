"use client"
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import React, { useEffect, useState } from 'react'



const queryUser  = async(searchValue) => {
  try{
    const res = await fetch(`http://localhost:3000/api/user`, {
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




const getqueriedUser = async() => {
  try{
    const res = await fetch(`http://localhost:3000/api/user`,{
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({searchValue})

    })
    if(!res.ok){
      throw new Error('Invalid res')
    }
    const data = await res.json() 
    // console.log(data)
    return data
   

  }catch(error){
    // throw new Error(error, "Fetch Error on requesting User on search")
    console.log( "Fetch Error getting User on search",error)
  

  }

}

const SearchInput = () => {

  const [searchValue, setSearchValue] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState([])

  useEffect(() => {
      const fetchuserInfo = async() => {

        const requestUserInfo = await queryUser(searchValue)
        // const getUserInfo = await getqueriedUser()
        

        setDisplayUserInfo(requestUserInfo)


      
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




  return (
    <div>

        <div className={searchstyle['searchContent']}>
        <input type="text" className={searchstyle['searchInput']}  
        onChange={handleChange}
        />
        {/* <button className={searchstyle['searchBtn']} >Search</button> */}

        
        </div>
        {/* {displayUserInfo.map((event,i) => (
          <div>
            <div key={i}>
              <div className='testtry1'>
              {event.userName}
              </div>
              
            </div>
          </div>
        ))} */}

        <div className='testtry1'>
        {displayUserInfo.map((event,i) => (
          <div>
            <div key={i}>
              <div className='testtry1'>
              {event.userId}
              </div>
              
            </div>
          </div>
        ))}
            
        </div>

          
      
    </div>

  )
}

export default SearchInput
