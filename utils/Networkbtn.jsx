import React from 'react'
import Image from 'next/image'
import NetworkIcon from '@assets/network.png'

const Networkbtn = () => {
  return (
    <div>
        <button className='Network-btn'><Image src={NetworkIcon} height={25} width={25} /></button>
      
    </div>
  )
}

export default Networkbtn
