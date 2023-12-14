import React from 'react'
import DisplayProfiIImage from '@utils/homeUtils/DisplayProfiIImage'




const SearchUser = () => {
  return (
    <div>
        <div className='HeaderArea'>
           
            <div className='ProfilPicSearchUser'>
                <DisplayProfiIImage/>
            </div>
            <div className='navBarSearchUser'>
                    nav
            </div>

        </div>
        <div className='searchSection'>
            <div  className="viewuserArea">view</div>
            <div className="searchuserArea">
                
                <input type="text" className="searchInput" />
                <button className="searchBtn">Search</button>
            </div>
        </div>
      
    </div>
  )
}

export default SearchUser
