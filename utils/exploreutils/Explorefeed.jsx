import React, { useEffect, useState } from 'react'
import useSWR from 'swr'


export async function getWorldWideEvents(){
    try{
        const res = await fetch('http://localhost:3000/api/events', {
            method: "GET",
            cache: "no-store"
        })
        
        if(!res.ok){
            throw new Error('res IS NOT OK,ERROR')
        }

        const data = await res.json()
        // console.log(data)
        return data


    }catch(error){
        console.error('Fetch API ERROR')

    }
}






const Explorefeed = () => {

    const [worldwideEvents, setWorldWideEvents] = useState([])



    useEffect(() => {
        const fetchWorldWideEvents = async() => {
            const data =  await getWorldWideEvents()
            setWorldWideEvents(data)
        }
    })

  return (
    <div>
      
    </div>
  )
}

export default Explorefeed
