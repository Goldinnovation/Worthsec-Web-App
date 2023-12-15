import React from 'react'
import DisplayProfiIImage from '@utils/homeUtils/DisplayProfiIImage'
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import GlobalNavbar from '@utils/globalnavbar/GlobalNavbar'
import GlobalLogo from '@utils/globallogo/GlobalLogo'
import GlobalHeader from '@utils/globalheader/GlobalHeader'
import SearchInput from '@utils/searchutils/SearchInput'



const SearchUser = () => {
  return (
    <div>
        <div className={searchstyle['HeaderArea']}>
            <GlobalHeader/>
        </div>
        <div className={searchstyle['searchSection']}>
        
            <div  className={searchstyle['viewuserArea']}>view</div>
            
            <div className={searchstyle['searchuserArea']}>
            
                <SearchInput/>
             
                
            </div>
        </div>
      
    </div>
  )
}

export default SearchUser
