import React from 'react'

const Userlogout = () => {

    const handlelogout = async() => { 
        try{
            const res = await fetch("http://localhost:3000/api/logout", {
                method: "GET",
                cache: 'no-store'
            })
            if(!res.ok){
                const errorData  = await res.json()
                console.log('Fetch error',errorData)
            }else {
                
                const data = await res.json()
                if(data.message === 'user is logged out'){
                    return window.location.href = '/'
                }
            }
    
        }catch(error){
            console.error('fetch error:', error)
        }
        }
  return (
    <div>
        <button className='logout' onClick={handlelogout}>logout</button>
        
      
    </div>
  )
}

export default Userlogout
