"use client"
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import React, { useEffect, useState } from 'react'



const handleInput = async(searchValue) => {
  try{
    const res = await fetch(`http://localhost:3000/api/user`,{
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
    // throw new Error(error, "Fetch Error on requesting User on search")
    console.log(error, "Fetch Error on requesting User on search",error)
  

  }

}

const SearchInput = () => {

  const [searchValue, setSearchValue] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState(null)

  useEffect(() => {
      const fetchuserInfo = async() => {

        const userInfo = await handleInput(searchValue)

        setDisplayUserInfo(userInfo)


      
      } 

      const intervalId = setInterval(fetchuserInfo, 5000)
      fetchuserInfo()

      return() => clearInterval(intervalId)
  },[searchValue])




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

        {displayUserInfo && (
          <div> 
              	{displayUserInfo.searchValue}

          </div>
        )}

          
      
    </div>
  )
}

export default SearchInput
