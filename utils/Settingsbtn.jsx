import React from 'react'
import Image from 'next/image'
import settingIcon from '@assets/settings.png'

const Settingsbtn = () => {
  return (
    <div>
        <button className='Setting-btn'><Image src={settingIcon} height={20} width={20}/></button>
    </div>
  )
}

export default Settingsbtn
