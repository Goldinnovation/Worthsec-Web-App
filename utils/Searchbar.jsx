import React from 'react'

const Searchbar = () => {
  return (
    <div>
         <div className="navSearchSection ">
          <div className="navContentArea">
            <div className='searchOptArea'>
              <div className='searchOpt'>
                <div>Events</div>
                <div>friends </div>
              </div>
            </div>
            <hr />
           
            <input type="text"  className="searchInput" placeholder="search"/>
          
          </div> 
       </div>
      
    </div>
  )
}

export default Searchbar
