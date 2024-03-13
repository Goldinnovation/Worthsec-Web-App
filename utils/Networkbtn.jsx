import React from 'react'
import Image from 'next/image'
import NetworkIcon from '@assets/network.png'
import network3dIcon from '@assets/net.png'

const Networkbtn = () => {
  return (
    <div>
        {/* <button className='Network-btn'><Image src={NetworkIcon}  alt="network-btn" height={25} width={25} /></button> */}
        <Image src={network3dIcon}  alt="network-btn" height={40} width={40} />

      
    </div>
  )
}

export default Networkbtn
